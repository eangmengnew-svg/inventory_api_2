const UserModel = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {

        const existedUser = await UserModel.findOne({ email: req.body.email });
        console.log(existedUser);

        if (existedUser) {
            res.status(404).json({
                success: false,
                message: "Email alreasy existed!"
            })
        }

        console.log(req.body.password)
        const hashPwd = await bcrypt.hash(req.body.password, 10);


        console.log(hashPwd);


        const newUser = await UserModel.create({
            username: req.body.username,
            password: hashPwd,
            email: req.body.email
        });

        res.status(201).json({
            success: true,
            message: "Register successful!"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
};

exports.login = async (req, res) => {
    try {

        const userRegistered = await UserModel.findOne({ email: req.body.email})
        
        if(!userRegistered){
            res.status(404).json({
                success: false,
                message: "This not register yet. Please register first."
            })
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, userRegistered.password);
        
        if(!isPasswordMatch){

            res.status(404).json({
                success: false,
                message: "Invalid username or password!"
            })
        }

        console.log(userRegistered._id)

        const token = jwt.sign({ userId: userRegistered._id }, process.env.JWT_SECRET, { expiresIn: '30s' })

        res.status(201).json({
            success: true,
            token: token,
            message: "Login succesful!"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

