const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL, {})
        console.log("DB connection successfully!!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = { connectDB };