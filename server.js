const express = require("express");
const path = require("path");
const $ = require("jquery");
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
// connect DB
const { connectDB } = require('./config/connect');
connectDB();

app.use(cookieParser());
// view engine setup
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// set path jquery
app.use("/jquery", express.static(path.join(__dirname + "/node_modules/jquery/dist/")));
//set static folder(public) path
app.use(express.static(path.join(__dirname + "/public")));

// default page load
app.get("/", (req, res) => {
    res.redirect("/tour/booking");
});
app.get("/admin", (req, res) => {
    res.redirect("/admin/login");
});
app.get("/about", (req, res) => {
    res.render("About");
});
app.get("/contact", (req, res) => {
    res.render("Contact");
});

app.use("/booking", require("./routes/booking.js"));
app.use("/tour", require("./routes/tour.js"));
app.use("/user", require("./routes/user.js"));
app.use("/admin", require("./routes/admin.js"));



//assign port
const port = process.env.PORT;
app.listen(port, () => console.log("server is runing port " + port));