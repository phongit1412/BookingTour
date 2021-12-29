const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'user'
    },
    tour_id: {
        type: String,
        required: true,
        ref: 'tour',
    },
    dateDeparture: {
        type: Date,
        required: [true, "Vui lòng CHọn ngày khởi hành"],
    }, // ngày khởi hành
    adult: {
        type: Number,
        trim: true,
        required: [true, "Vui lòng chọn số lượng người lớn"],
    }, // số người lớn
    payment: {
        type: String,
        trim: true,
        required: [true, "Vui lòng chọn hình thức thanh toán"],
    },
    children: {
        type: Number,
        trim: true,
        required: [true, "VUi lòng chọn số lượng trẻ em"]
    }, // số trẻ em
    total: {
        type: Number,
    }, // tổng cộng số tiền
}, {
    timestamps: true,
});

module.exports = mongoose.model("Booking", bookingSchema);