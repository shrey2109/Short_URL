const shortid = require("shortid");
const URLModel = require("../models/urlModel");

async function handleGenerateNewShortLink(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ message: "No URL provided/Invalid URL" });
  const shortId = shortid();

  await URLModel.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URLModel.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortLink, handleGetAnalytics };
