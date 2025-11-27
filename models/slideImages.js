import mongoose from "mongoose";


const slideImagesSchema = new mongoose.Schema({
    sldId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    
})

const slideImage = mongoose.model("slideImages", slideImagesSchema)
export default slideImage