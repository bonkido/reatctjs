import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: image_filename,
        quantity: req.body.quantity
    });
    try {
        await food.save();
        res.status(201).json({ message: "Food added successfully", food });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi kết nối" });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findByIdAndDelete(req.body.id);
        fs.unlink(`./uploads/${food.image}`, () => {});
        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi kết nối" });
    }
};

const DetailFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params._id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        res.json({ success: true, food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi kết nối" });
    }
};

const SearchFood = async (req, res) => {
    try {
        const { query } = req.body;
        const foods = await foodModel.find({
            name: { $regex: query, $options: 'i' } 
        });
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi kết nối" });
    }
};

const categoriesFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        const categories = await foodModel.distinct('category');
        res.json({ success: true, data: foods, categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi kết nối" });
    }
};
// add category
const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        // Kiểm tra xem danh mục đã tồn tại chưa
        const existingCategory = await foodModel.findOne({ category: name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Danh mục đã tồn tại' });
        }

        const newCategory = new foodModel({
            category: name,
            name: null,
            price: null,
            description: null,
            image: null,
            quantity: null
        });

        await newCategory.save();
        res.status(201).json({ message: "Danh mục mới được thêm thành công", newCategory });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// remove category
const removeCategory = async (req, res) => {
    try {
      const { category } = req.body;
      const deletedCategory = await foodModel.findOneAndDelete({ category });
      if (!deletedCategory) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
      res.json({ success: true, message: "Category removed successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error connecting to the database" });
    }
  };

export { addFood, listFood, removeFood, DetailFood, SearchFood , categoriesFood , addCategory , removeCategory };