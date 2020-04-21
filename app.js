var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index");
var playersRouter = require("./routes/players");
var statsRouter = require("./routes/stats");
var leaderboardRouter = require("./routes/leaderboard");

require("dotenv").config();

var app = express();

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((something) => {
    console.log(`Database connected successfully`);
    //console.log("something", something.Collection);
  })
  .catch((err) => console.log(err, "mongoose test"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/players", playersRouter);
app.use("/stats", statsRouter);
app.use("/leaderboard", leaderboardRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
