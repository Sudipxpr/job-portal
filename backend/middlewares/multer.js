import multer from "multer";

const storage = multer.memoryStorage();

// For user profile: multiple files fields
export const multiUpload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);

// For company logo: single file field
export const singleUpload = multer({ storage }).single("file");
