import express from 'express';
import { addFood , DetailFood, listFood , removeFood , SearchFood , categoriesFood , addCategory , removeCategory } from "../controllers/foodController.js";
import multer from "multer"

const foodRouter = express.Router();

//image storage engine

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image") , addFood)
foodRouter.get("/list",listFood)
foodRouter.get("/categories",categoriesFood)
foodRouter.post("/addcategories",addCategory)
foodRouter.post("/removecategories",removeCategory)
foodRouter.post("/remove",removeFood)
foodRouter.get("/:_id",DetailFood)
foodRouter.post("/search",SearchFood)


export default foodRouter;