const express = require("express");
const router = express.Router();

const {generateSummary} = require("../controller/smart_summary_controller");

router.post("/getsummary", generateSummary);

module.exports = router;