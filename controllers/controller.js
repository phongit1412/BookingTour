const usermodel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.SECRETKEY;
const secret = process.env.secret_user;

const address_mail_company = process.env.address_mail_company;
const address_mail_company_pass = process.env.address_mail_company_pass;
//body code
//get
exports.login = (req, res) => {
    res.render('Signin');
};
//get
exports.register = (req, res) => {
    res.render('Signup');
};

//get
exports.authCookies = (req, res) => {
    try {
        var token = req.cookies.token;
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                return res.redirect("/user/login");
            } else {
                res.render('booking');
            }
        })
    } catch (error) {
        return res.render("views/Error404");
    }
};
//get
exports.authProfile = (req, res) => {
    try {
        var token = req.cookies.token;
        jwt.verify(token, secret, (err, data) => {
            console.log(data);
            if (err) {
                return res.redirect("/user/login");
            } else {
                res.render('profileUser', { data: data });
            }
        })
    } catch (error) {
        return res.render("views/Error404");
    }
};
//get
exports.ActiProfile = (req, res) => {
    try {
        jwt.verify(req.params.token, secret, (err, data) => {
            if (err) {
                return res.json({ message: "Hãy very mail trước" });
            } else {
                usermodel.findOneAndUpdate({ confirmationCode: data.mail }, { status: 'Active' }, (err, result) => {
                    if (err) {
                        res.json({ message: "Email chưa được đăng ký" });
                    } else {
                        res.render('Actived');
                    }
                });
            }
        })
    } catch (error) {
        return res.render("views/Error404");
    }
};
//post
exports.authLogin = async(req, res) => {
    try {
        var username = req.body.username.toLowerCase() || "test";
        var password = req.body.password || "@@";
        await find_user({ username }, async(err, user) => {
            if (err) {
                res.status(402).json({ msg: "error" + err });
            } else {
                if (user) {
                    if (user.status != "Active") {
                        return res.status(401).json({ message: "Pending Account. Please Verify Your Email!" })
                    } else {
                        var id = user.id;
                        var validPassword = null
                        if (validPassword) {
                            res.status(200).json({ message: "Valid password", token: token });
                        } else {
                            res.status(400).json({ message: "Invalid Password" });
                        }
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
        var mail = req.body.email;
        var tokenMail = await jwt.sign({ mail }, secret, { expiresIn: 60 * 60 * 24 });
        var users = new usermodel({
            userName: req.body.username,
            passWord: await bcrypt.hash(req.body.password, salt),
            full_name: req.body.full_name,
            sdt: req.body.sdt,
            email: req.body.email,
            confirmationCode: req.body.email,
        });
        await find_user({ username }, async(err, user) => {
            if (err) {
                res.status(500).json({ msg: "error" + err });
            } else {
                if (user) {
                    res.status(400).json({ msg: "User exist" });
                } else {
                    await createUser(users, (err, userData) => {
                        if (err) {
                            res.status(500).json({ msg: "Email exist" });
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

find_user = ({ username }, callback) => {
    usermodel.findOne({ userName: username }, (err, result) => {
        if (err) callback(err, null);
        else {
            callback(null, result);
        }
    })
};

