import reviewsAndComments from "../models/reviewsAndComments.js";
import Product from "../models/product.js";

export function getReviewsAndComments(req, res) {
    reviewsAndComments.find()
        .then(reviews => {
            res.json(reviews);
        })
        .catch(err => {
            res.status(500).json({
                message: "Error fetching reviews and comments",
                error: err.message
            });
        });
}

export async function addReviewAndComment(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first"
        });
        return;
    }

    if (req.user.isDisabled) {
        res.status(403).json({
            message: "Your account is disabled"
        });
        return;
    }
    const { productId, comment, rating } = req.body;
    if (!productId || !comment) {
        res.status(400).json({
            message: "Product ID, comment, and rating are required"
        });
        return;
    }

    const createCommentId = "CMT" + comment.length + Math.floor(Math.random() * 10000);
    const updatedProduct = await Product.findOneAndUpdate(
        {
            productId: productId
        }, {
        $push: {
            comments: {
                commentId:createCommentId,
                email: req.user.email,
                rating: rating,
                comment: comment,
                profilePicture: req.user.profilePicture
            }
        }
    },
        { new: true }
    )
    if (updatedProduct && updatedProduct.comments.length > 0) {
        const total = updatedProduct.comments.reduce((sum, c) => sum + c.rating, 0);
        const avgRating = total / updatedProduct.comments.length;
        updatedProduct.rating = avgRating;
        await updatedProduct.save().then(
            () => {
                res.status(201).json({
                    message: "Review added successfully",
                    product: updatedProduct
                });
            }
        ).catch(err => {
            res.status(500).json({
                message: "Error saving product",
                error: err.message
            });
        });
    }
}

export async function updateReviewAndComment(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first"
        });
        return;
    }
    if (req.user.isDisabled) {
        res.status(403).json({
            message: "Your account is disabled"
        });
        return;
    }
    const { reviewId, comment, rating } = req.body;
    if (!reviewId || !comment || !rating) {
        res.status(400).json({
            message: "Review ID, comment, and rating are required"
        });
        return;
    }

    await reviewsAndComments.findOneAndUpdate({ _id: reviewId }, { comment, rating }, { new: true })
        .then(updatedReview => {
            if (!updatedReview) {
                res.status(404).json({
                    message: "Review not found"
                });
                return;
            }
            res.json({
                message: "Review updated successfully",
                review: updatedReview
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error updating review",
                error: err.message
            });
        });
}
export async function deleteReviewAndComment(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first"
        });
        return;
    }
    if (req.user.isDisabled) {
        res.status(403).json({
            message: "Your account is disabled"
        });
        return;
    }

    const { commentId , productId } = req.body;

    if (!commentId) {
        res.status(400).json({
            message: "Comment ID is required"
        });
        return;
    }
    await Product.findOneAndUpdate(
        { productId },
  { $pull: { comments: { commentId: commentId } } },
  { new: true }  
    )
        .then(
            () => {
                res.json({
                    message: "Review deleted successfully"
            })
        }
       ).catch(
        (err)=>{
            console.error(err);
            res.status(500).json({
                message: "Error deleting review",
                error: err.message
            })
        }
       )
}