import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
    deleteCompany
} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js"; //  Import this

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);

//  FIX: Add singleUpload middleware here
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);
// ...existing code...

router.route("/delete/:id").delete(isAuthenticated, deleteCompany);

// ...existing code...
export default router;
