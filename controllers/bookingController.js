const booking = require("../models/booking");
const tour = require("../models/tour");
const jwt = require("jsonwebtoken");
const secret = process.env.secret_user;

exports.getBooking = (req, res) => {
    // console.log(req.body)
    booking.find((err, bookingData) => {
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "success", data: bookingData });
        }
    });
}
exports.addBooking = (req, res) => {
    var uid = "";
    var token = req.cookies.token || "x.x.x";
    try {
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                res.json({ msg: "chua dang nhap" });
            } else {
                uid = data.id;
                var bookings = new booking({
                    user_id: uid,
                    tour_id: req.body.tour_id,
                    dateDeparture: req.body.dateDeparture,
                    adult: req.body.adult,
                    payment: req.body.payment,
                    children: req.body.children,
                    total: req.body.total,
                });
                booking.create(bookings, (err, bookingData) => {
                    if (err) {
                        console.log(err);
                        res.json({ msg: "error" });
                    } else {
                        res.json({ msg: "success", data: bookingData });
                    }
                });

            }
        })


    } catch {
        return res.render("views/Error404");
    }
    console.log(uid);

}
exports.removeBooking = (req, res) => {
    booking.findByIdAndRemove(req.params.id, (err, bookingData) => {
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "success", data: bookingData });
        }
    });
}
exports.updateBooking = (req, res) => {
    booking.findByIdAndUpdate(req.params.id, req.body, (err, bookingData) => {
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "success", data: bookingData });
        }
    });
}
exports.findBooking = (req, res) => {
    booking.findById(req.params.id, (err, bookingData) => {
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "success", data: bookingData });
        }
    });
}