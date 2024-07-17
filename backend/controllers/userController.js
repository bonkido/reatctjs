import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// all user list
const listUser = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({success:true,data:users})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Lỗi kết nối"})
    }
}

// login user
const loginUser = async (req,res)=> {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email: email});
        if(!user){
            return res.json({success: false, message: "Không tìm thấy tài khoản"})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success: false, message: "Mật khẩu không đúng"})
        }
        const token = createToken(user._id)
        res.json({success: true, token})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Lỗi kết nối"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req,res)=> {
    const {name,password,email} = req.body;
    try {
        // check khách hàng đã dki chưa
        const exits = await userModel.findOne({email});
        if(exits){
            return res.json({success:false,message:"Khách hàng đã tồn tại"})
        }
        //check
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Email không hợp lệ"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Mật khẩu phải có ít nhất 8 ký tự"})
        }

        // mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success: true, token})
    } catch (error) {
        console.log(error);
        res.json({success: false, error})
    }
}

export {loginUser, registerUser , listUser}