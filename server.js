const express = require("express");
const app = express();

// use json data
app.use(express.json())

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes")
const authRoutes = require("./routes/authRoutes")

//config .env fille
require("dotenv").config();

//connect db
connectDB();


//product routes
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/auth", authRoutes)

//expose backend port
app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

