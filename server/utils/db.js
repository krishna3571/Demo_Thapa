const mongoose = require("mongoose")

const URL = "mongodb://127.0.0.1:27017/mern_admin"

const connectDb = async () => {
    try {
        await mongoose.connect(URL)
        console.log("connect succes first")
    } catch (error) {
        console.error("database connect error")
        process.exit(0)
    }
}

module.exports = connectDb;

