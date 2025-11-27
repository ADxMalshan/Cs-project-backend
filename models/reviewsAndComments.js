import mongoose from "mongoose"


const reviewsAndCommentsSchema = new mongoose.Schema({
    reviewId:{
        type: String,
        required: true,
        unique: true
    },
    productId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    comments: {
        type:[
            {
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
                email: {
                    type: String,
                    required: true
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 5,
                    default: 0
                }
            }
        ],
        default: [],
        required: true
    }

})
const reviewsAndComments = mongoose.model("reviewsAndComments", reviewsAndCommentsSchema)
export default reviewsAndComments