const express = require("express");
const router = express.Router();

const {getPdfText} = require("../controller/pdf_extract_controller");
const {getImageText} = require("../controller/ocr_image_controller");
const {mapLanguage} = require("../middleware/language_mapping_middleware");
const {uploadToCloudinary} = require("../middleware/file_upload_middleware");

router.post("/pdftext",uploadToCloudinary, getPdfText);
router.post("/imagetext",uploadToCloudinary, mapLanguage, getImageText);

module.exports = router;