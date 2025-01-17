const express = require("express");
const router = express.Router();

const {uploadToCloudinary} = require("../controller/file_upload_controller");
const {fileTypeCheck} = require("../middleware/check_file_type_middleware");

router.post("/upload", fileTypeCheck, uploadToCloudinary);
module.exports = router;