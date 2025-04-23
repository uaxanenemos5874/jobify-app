import mongoose from "mongoose";
import Job from "../models/job.model.js";
import { StatusCodes } from "http-status-codes";
import day from "dayjs";

// Create Job
export async function createJob(req, res) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! No token provided 🔒",
      });
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "New job created ✅",
      createdJob: job,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Failed to create job ❌",
    });
  }
}

// Get All Jobs
export async function getAllJobs(req, res) {
  try {
    if (!req.user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! No token provided 🔒",
      });
    }

    const { search, jobStatus, jobType, sort } = req.query;
    const queryObj = {
      createdBy: req.user.userId,
    };
    if (search) {
      queryObj.$or = [
        { position: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }
    if (jobStatus && jobStatus !== "all") {
      queryObj.jobStatus = jobStatus;
    }
    if (jobType && jobType !== "all") {
      queryObj.jobType = jobType;
    }
    const sortOptions = {
      newest: "-createdAt",
      oldest: "createdAt",
      "a-z": "position",
      "z-a": "-position",
    };
    const sortKey = sortOptions[sort] || sortOptions.newest;
    // Setting up - PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments(queryObj);
    const numOfPages = Math.ceil(totalJobs / limit);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Fetched jobs ✅",
      totalJobs,
      numOfPages,
      currentPage: page,
      jobs,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}

// Get Single Job
export async function getSingleJob(req, res) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! No token provided 🔒",
      });
    }
    const singleJob = await Job.findById(req.params.id);

    if (!singleJob) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Job not found ❌",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Fetched job details ✅",
      singleJob,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}

// Update Job
export async function updateJob(req, res) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! No token provided 🔒",
      });
    }
    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Job not found ❌",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Job updated successfully ✅",
      updatedJob,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}

// Delete Job
export async function deleteJob(req, res) {
  try {
    if (!req.user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! No token provided 🔒",
      });
    }
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Job not found ❌",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Job deleted successfully ✅",
      removedJob: deletedJob,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}

// Job-Stats
export async function showStats(req, res) {
  //res.send({ status: true, message: "Testing Job Stats 📊✅" });
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  try {
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetched Job-Stats. 📊✅",
      defaultStats,
      monthlyApplications,
    });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}
