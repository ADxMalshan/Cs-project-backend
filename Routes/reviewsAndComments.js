import express from 'express';
import { addReviewAndComment, deleteReviewAndComment, getReviewsAndComments, updateReviewAndComment } from '../controllers/reviewsAndCommentsController.js';
const reviewsAndCommentsRouter = express.Router();

reviewsAndCommentsRouter.post("/", addReviewAndComment);
reviewsAndCommentsRouter.get("/", getReviewsAndComments);
reviewsAndCommentsRouter.put("/", updateReviewAndComment);
reviewsAndCommentsRouter.delete("/", deleteReviewAndComment);

export default reviewsAndCommentsRouter;