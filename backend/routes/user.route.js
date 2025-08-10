import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multiUpload } from "../middlewares/multer.js"; //  use multiUpload

const router = express.Router();

router.route("/register").post(multiUpload, register); // if register supports file uploads
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, multiUpload, updateProfile); //  updated

export default router;

