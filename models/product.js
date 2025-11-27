import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    altNames : {
        type : [String],
        default : []
    },
    price : {
        type : Number,
        required : true
    },
    labeledPrice : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    images : {
        type : [String],
        required : true,
        default : ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyrVHW3ETfRAAtf780OQqLRYM6inchgfNgQg&s"]
    },
    stock : {
        type : Number,
        required : true
    },
    rating:{
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    comments: [{
        commentId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
            default: 0
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        default: []
    },
],
    soldCount:{
        type: Number,
        default: 0,
        min: 0,
    }
   
})

const Product = mongoose.model("products",productSchema)
export default Product;