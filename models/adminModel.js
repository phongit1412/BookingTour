const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Vui long nhap username"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Vui long nhap password"],
        trim: true,
    },
    full_name: {
        type: String,
    },
});

module.exports = mongoose.model('admin', adminSchema);