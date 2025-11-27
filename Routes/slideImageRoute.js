import express from "express";
import { addSlideImages, deleteSlideImages, getSlideImages } from "../controllers/slideImagesController.js";


const slideImageRouter = express.Router();

slideImageRouter.get("/",getSlideImages)
slideImageRouter.post("/",addSlideImages)
slideImageRouter.delete("/:id",deleteSlideImages)

export default slideImageRouter