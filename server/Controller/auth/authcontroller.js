import User from "../../model/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
class AuthController{
    static async register(req,res) {
        const { userName, userEmail, password, role } = req.body;    
        
        const existingUser = await User.findOne({
            $or: [{userName},{userEmail}]
        })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User name or user email already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            userEmail,
            role,
            password: hashPassword,
        });
        await newUser.save()
        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
        });

    }  
    static async login(req,res){
        const { userEmail, password } = req.body;
        const checkUser = await User.findOne({ userEmail });
        if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const accessToken = jwt.sign(
            {
                _id: checkUser._id,
                userName: checkUser.userName,
                userEmail: checkUser.userEmail,
                role: checkUser.role,
            },
            "JWT_SECRET",
            { expiresIn: "120m" }
        );
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {
                accessToken,
                user: {
                    _id: checkUser._id,
                    userName: checkUser.userName,
                    userEmail: checkUser.userEmail,
                    role: checkUser.role,
                },
            },
        });     
    }
}

export default AuthController