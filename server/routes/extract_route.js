const express = require("express");
const router = express.Router();

const {getPdfText} = require("../controller/pdf_extract_controller");
const {getImageText} = require("../controller/ocr_image_controller");
const {mapLanguage} = require("../middleware/language_mapping_middleware");

router.get("/pdftext", getPdfText);
router.get("/imagetext", mapLanguage,getImageText);

module.exports = router;