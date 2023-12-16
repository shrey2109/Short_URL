const express = require("express");
const app = express();
const dotenv = require("dotenv");

const urlRoute = require("./routes/urlRouter");
const { connectToMongoose } = require("./connect");
const URLModel = require("./models/urlModel");

dotenv.config();

const PORT = process.env.PORT || 8001;

connectToMongoose(process.env.MONGO_URL)
  .then(console.log("MongoDb Connected"))
  .catch(console.log("Error in connection with MongoDb"));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URLModel.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log("Server started on Port : " + PORT);
});
