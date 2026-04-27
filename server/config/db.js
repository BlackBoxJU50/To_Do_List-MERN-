const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ahmedhasib2224_db_user2:DDITvJNbLKmb6mgV@cluster0.pchryyh.mongodb.net/employee?appName=Cluster0";
        await mongoose.connect(MONGODB_URI, {
            tlsAllowInvalidCertificates: true
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Could not connect to MongoDB", err);
        process.exit(1);
    }
};

module.exports = connectDB;
