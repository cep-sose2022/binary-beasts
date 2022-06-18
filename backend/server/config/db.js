const mongoose = require('mongoose');
const path = require("path");
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '../.env')
} );const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECTION);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};


module.exports = connectDB;