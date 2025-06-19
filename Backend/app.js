require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));
console.log("cors setup done");

//dbconnection
require("./models/database").connnectDatabase();

//logger means it will log the status of route
const logger = require("morgan");
app.use(logger("tiny"));

//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Create uploads and documents folders if they don't exist
const uploadsDir = path.join(__dirname, "uploads");
const documentsDir = path.join(uploadsDir, "documents");

// Create the 'uploads' directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Create the 'documents' directory if it doesn't exist
if (!fs.existsSync(documentsDir)) {
  fs.mkdirSync(documentsDir);
}

//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieparser());

//base route or entry route of user file
app.use("/user", require("./routes/userRouter"));

//base route for manager
app.use("/task", require("./routes/taskRouter"));

//ErrorHandler
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/error");
app.all("*", (req, res, next) => {
  //isme error ane ke baad or hamare pass bahut bada error milega isliye iske baad generatederrors wali line chalegi
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});
app.use(generatedErrors);

app.listen(
  process.env.PORT,
  console.log(`sever is running on port ${process.env.PORT}`)
);
