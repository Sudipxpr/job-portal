import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  updateJob,
  deleteJob
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);            // Admin creates job
router.route("/get").get(isAuthenticated, getAllJobs);           // Student fetches all jobs
router.route("/get/:id").get(isAuthenticated, getJobById);       // Student views a job by ID
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs); // Admin gets all jobs created by them

//  New routes for update & delete
router.route("/update/:id").put(isAuthenticated, updateJob);     // Admin updates job
router.route("/delete/:id").delete(isAuthenticated, deleteJob);  // Admin deletes job

export default router;
