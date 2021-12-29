const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    tourName: {
        type: String,
        required: [true, "Vui lòng nhập Tên Tour"],
        trim: true,
    },
    tourDescription: {
        type: String,
        required: [true, "Vui lòng nhập Thông tin Tour"],
        trim: true,
    },
    tourDuration: {
        type: String,
        required: [true, "Vui lòng nhập Thời gian ở"],
        trim: true,
    }, // thoi gian o
    tourDeparture: {
        type: String,
        required: [true, "Vui lòng nhập Điểm khởi hành"],
        trim: true,
    }, // diem khoi hanh
    tourTransportation: {
        type: String,
        required: [true, "Vui lòng nhập Phương tiện di chuyển"],
        trim: true,
    }, // phuong tien di chuyen
    price: {
        type: String,
        required: [true, "Vui Lòng nhập Giá"],
    },
    tourDetail: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

//Export function to create "UserSchema" model class
module.exports = mongoose.model('tour', tourSchema);