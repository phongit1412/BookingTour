const tour = require("../models/tour");

exports.getTour = (req, res, next) => {
    let perPage = 4;
    let page = req.params.page || 1;
    tour
        .find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, tourData) => {
            tour.countDocuments((err, count) => {
                if (err) return next(err);
                res.render('home', {
                    data: tourData, // sản phẩm trên một page
                    current: page, // page hiện tại
                    pages: Math.ceil(count / perPage)
                })
            });
        });
}
exports.themTour = (req, res) => {
    tour.find((err, tourData) => {
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.render('admin/ThemTour', { msg: "success", data: tourData });
        }
    });


};


exports.addTour = (req, res) => {

    var tours = new tour({
        tourName: req.body.tourName,
        tourDescription: req.body.tourDescription,
        tourDuration: req.body.tourDuration,
        tourDeparture: req.body.tourDeparture,
        tourTransportation: req.body.tourTransportation,
        price: req.body.price,
        tourDetail: req.body.tourDetail
    });
    tour.create(tours, (err, tourData) => {
        if (err) {
            console.log(err);
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "success" });
        }
    });
}
exports.removeTour = (req, res) => {
    tour.findByIdAndRemove(req.body.id, (err, tourData) => {
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "success", data: tourData });
        }
    });
}
exports.updateTour = (req, res) => {
    tour.findByIdAndUpdate(req.body.id, req.body, (err, tourData) => {
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "success", data: tourData });
        }
    });
}
exports.findTour = (req, res) => {
    tour.findById(req.params.id, (err, tourData) => {
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "success", data: tourData });
        }
    });
}