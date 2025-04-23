//populate DB with jobs.
import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/job.model.js";
import User from "./models/user.model.js";
dotenv.config();

try {
  await mongoose.connect(process.env.MONGODB_URL);
  const user = await User.findOne({ email: "soumadip@test.com" });
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Success ✅");
  process.exit(0);
} catch (error) {
  console.log("🔴 ERROR: ", error);
  process.exit(1);
}
