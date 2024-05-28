const mongoose = require("mongoose")



const URL = process.env.MONGODB_URL

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

