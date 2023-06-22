if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const connectToDb = require("./dbConnection");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
async function startServer() {
  try {
    ////////////////////////////////////////////////////Connect to Database
    await connectToDb();
    console.log("connect to Database");
    ////////////////////////////////////////////////////set ejs as template-Engine and define the .ejs file path
    app.set("views", path.join(__dirname, "src/views"));
    app.set("view-engine", "ejs");
    ////////////////////////////////////////////////////Add static files to .ejs files
    app.use(express.static(path.join(__dirname, "src/public")));
    ////////////////////////////////////////////////////parse the all request body and cookies
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    ////////////////////////////////////////////////////////////////////////////////////
    const loginRouter = require('./src/routes/loginRouter');
    const registerRouter = require('./src/routes/registerRouter');
    const logoutRouter = require("./src/routes/logoutRouter");
    const chatroomRouter = require("./src/routes/chatroomRouter");
    app.use("/login", loginRouter);
    app.use("/register", registerRouter);
    app.use("/logout", logoutRouter);
    app.use("/", chatroomRouter);
    app.get("/home", (_, res) => {
      res.redirect("/");
    });
    app.listen(process.env.LISTEN_PORT, () => console.log("Server started"));
  }
  catch (err) {
    console.log("Error occured on database connection: ", err.message);
  }
}
startServer();