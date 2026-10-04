const mongoose = require("mongoose");

async function connectDB(){
    try {
        
        mongoose.connect(process.env.MONGODB_URI,{ dbName: 'inventory_db' });
        console.log("Database Connected!")

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
