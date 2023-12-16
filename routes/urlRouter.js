const express = require("express");
const {
  handleGenerateNewShortLink,
  handleGetAnalytics,
} = require("../controllers/urlController");

const router = express.Router();

router.post("/", handleGenerateNewShortLink);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
