import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/food').then(()=>console.log('Kết nối thành công'))
}