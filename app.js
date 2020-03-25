const express = require("express");
const morgan = require("morgan");
const playStore = require("./playstore");

const app = express();
app.use(morgan("dev"));

app.get("/app", (req, res) => {
  let results = [...playStore];
  const { sort, genres } = req.query;

  if (sort) {
    if (!(sort === "Rating") && !(sort === "App")) {
      res.status(400).send("sort should either be by app or rating");
    } else {
      results.sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
      });
    }
  }
  if (genres) {
    const validGenres = [
      "Action",
      "Puzzle",
      "Strategy",
      "Casual",
      "Arcade",
      "Card"
    ];
    if (!validGenres.includes(genres)) {
      res.status(400).send("genre must be one of the listed genres");
    } else {
      results = results.filter(app => {
        return app["Genres"].includes(genres);
      });
    }
  }
  res.json(results);
});

module.exports = app;
