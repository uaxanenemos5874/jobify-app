//! CUSTOM-VALIDATORS

import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE} from "../utils/constants.js";
import Job from "../models/job.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

//! reusable code, doesn't change
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, _, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Unauthorized")) {
          throw new UnauthorizedError(
            "Unauthorized Access | Access DENIED! 🔴"
          );
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

//todo: 1 for every controller ☑️

//! JOB-input
export const validateJobInput = withValidationErrors([
  //for strings
  body("company").notEmpty().withMessage("company-name is required!🔴"),
  body("position").notEmpty().withMessage("job-position is required! 🔴"),
  body("jobLocation").notEmpty().withMessage("Job-Location is required!🔴"),
  //for enums:
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid job-status value! 🔴"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid job-type value! 🔴"),
]);

//! ID-Syntax
export const validateIdParams = withValidationErrors([
  param("id").custom(async (val, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(val);
    if (!isValidId) {
      throw new Error(`🔴 Invalid MongoDb ID: ${val}`);
    }
    const singleJob = await Job.findById(val);
    if (!singleJob) throw new Error(`no job with id: ${val}, found`);
    //console.log(singleJob)
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === singleJob.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("Unauthorized Access | Access DENIED! 🔴");
    }
  }),
]);

//! REGISTER-input
export const validateRegisterInput = withValidationErrors([
  //for strings
  body("name").notEmpty().withMessage("user-name is required!🔴"),
  body("lastName").notEmpty().withMessage("user-lastName is required!🔴"),
  body("email")
    .notEmpty()
    .withMessage("email is required!🔴")
    .isEmail()
    .withMessage("Invalid Email Format! ❌📧")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists! 🔴");
      }
    }),

  body("location").notEmpty().withMessage("user-location is required!🔴"),
  body("password")
    .notEmpty()
    .withMessage("user-password is required!🔴")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long! 🔑6️⃣"),
]);

//! LOGIN-Input
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required!🔴")
    .isEmail()
    .withMessage("Invalid Email Format! ❌📧"),
  body("password").notEmpty().withMessage("Password is required!🔴"),
]);

//! UPDATING CURRENTLY LOGGED-IN USER
export const validateUpdatedUser = withValidationErrors([
  //for strings
  body("name").notEmpty().withMessage("user-name is required!🔴"),
  body("lastName").notEmpty().withMessage("user-lastName is required!🔴"),
  body("email")
    .notEmpty()
    .withMessage("email is required!🔴")
    .isEmail()
    .withMessage("Invalid Email Format! ❌📧")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("Email already exists! 🔴");
      }
    }),

  body("location").notEmpty().withMessage("user-location is required!🔴"),
]);
