const adminmodel = require("../models/adminModel");
const booking = require("../models/booking");
const usermodel = require("../models/userModel");

const tour = require("../models/tour");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRETKEY;
const moment = require('moment');
//body code
//get
exports.login = (req, res) => {
    res.render('admin/login');
};

//get
exports.tourManager = (req, res) => {
    res.render('admin/manager');
};

//gte
exports.getTour = (req, res) => {
        tour.find((err, RtourData) => {
            if (err) {
                res.json({ msg: "error" });
            } else {
                res.render("admin/custommer", { msg: "success", data: RtourData });
            }
        });
    }
    //getTour
exports.getListUserBookingTour = (req, res) => {
        var id = req.params.tour_id;
        var list = [];
    }
    //get
exports.authCookies = (req, res) => {

};
//post
exports.authLogin = async(req, res) => {
    try {
        var username = req.body.username || "test";
        var password = req.body.password || ".";
        await find_user({ username }, async(err, user) => {
            if (err) {
                res.status(402).json({ msg: "error" + err });
            } else {
                if (user) {
                    var id = user.id;
                    var validPassword = null
                    if (validPassword) {
                        var token = null
                        res.status(200).json({ message: "Valid password", token: token });
                    } else {
                        res.status(400).json({ message: "Invalid Password" });
                    }
                } else {
                    res.status(401).json({ message: "User does not exist" });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "error" + error });
    }

};
//post 
exports.authLoginAdmin = async(req, res) => {
    try {
        var username = req.body.username.toLowerCase() || "test";
        var password = req.body.password || ".";
        await find_user_admin({ username }, async(err, user) => {
            if (err) {
                res.status(402).json({ msg: "error" + err });
            } else {
                if (user) {
                    var id = user.id;
                    var validPassword = await bcrypt.compare(password, user.password);
                    if (validPassword) {
                        var token = await jwt.sign({ id }, secret, { expiresIn: 60 * 90 })
                        res.status(200).json({ message: "Valid password", token: token });
                    } else {
                        res.status(400).json({ message: "Invalid Password" });
                    }
                } else {
                    res.status(401).json({ message: "User does not exist" });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "error" + error });
    }

};
//post
exports.authRegister = async(req, res) => {
    try {
        var salt = await bcrypt.genSalt(10);
        var username = req.body.username;
        var users = new adminmodel({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, salt),
            full_name: req.body.full_name
        });
        console.log(users);
        await find_user_admin({ username }, async(err, user) => {
            if (err) {
                res.status(500).json({ msg: "error" + err });
            } else {
                if (user) {
                    res.status(400).json({ msg: "User exist" });
                } else {
                    await createUser(users, (err, userData) => {
                        if (err) {
                            res.status(500).json({ msg: "error" });
                        } else {
                            res.status(200).json({ msg: "Success" });
                        }
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "error" + error });
    }
};

//end body

//static method
createUser = (g_user, callback) => {
    g_user.save((err, result) => {
        if (err) callback(err, null);
        else {
            callback(null, result);
        }
    })
};

find_user_admin = ({ username }, callback) => {
    adminmodel.findOne({ username: username }, (err, result) => {
        if (err) callback(err, null);
        else {
            callback(null, result);
        }
    })
};

find_tour = ({ username }, callback) => {
    adminmodel.findOne({ username: username }, (err, result) => {
        if (err) callback(err, null);
        else {
            callback(null, result);
        }
    })
};
