const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const adminRouter = require("./src/routes/admin.route");
const vehicleCategoryRouter = require("./src/routes/vehicle-category.route");
const vehicleTypeRouter = require("./src/routes/vehicle-type.routes");
const vehicleRouter = require("./src/routes/vehicle.routes");
const fileRouter = require("./src/routes/file.route");
const bookingRouter = require("./src/routes/booking.route");
const enquiryRouter = require("./src/routes/enquiry.route");
const settingRouter = require("./src/routes/setting.route");
const popularDestinationRoutes = require("./src/routes/popularDestination.route");
const {
  testPostgresConnection,
} = require("./config/db/postgres/connectPostgres");
const cmsrouter = require("./src/routes/cms.route");
const blogRouter = require("./src/routes/blog.routes");

const app = express();

testPostgresConnection();

app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "jade");
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: false,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/vehicle-category", vehicleCategoryRouter);
app.use("/vehicle-type", vehicleTypeRouter);
app.use("/vehicle", vehicleRouter);
app.use("/file", fileRouter);
app.use("/booking", bookingRouter);
app.use("/enquiry", enquiryRouter);
app.use("/settings", settingRouter);
app.use("/cms", cmsrouter);
app.use("/popular-destination", popularDestinationRoutes);
app.use("/blog",blogRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
