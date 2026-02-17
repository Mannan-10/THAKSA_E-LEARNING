import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import RatingInput from "./RatingInput";
import useToast from "../hooks/useToast";
import { submitReview } from "../services/reviewService";

export default function ReviewForm({ courseId, onReviewSubmitted }) {
    const { showToast } = useToast();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            setError("Please select a rating");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            await submitReview(courseId, { rating, comment: comment.trim() });
            showToast("Review submitted successfully", "success");
            setRating(0);
            setComment("");
            if (onReviewSubmitted) {
                onReviewSubmitted();
            }
        } catch (requestError) {
            const errorMsg = requestError?.response?.data?.message || "Failed to submit review";
            setError(errorMsg);
            showToast(errorMsg, "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                    Write a Review
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                    <Box sx={{ mb: 2.5 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                            Your Rating *
                        </Typography>
                        <RatingInput value={rating} onChange={setRating} />
                    </Box>

                    <TextField
                        label="Your Review (Optional)"
                        multiline
                        rows={4}
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience with this course..."
                        sx={{ mb: 2 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={submitting || rating === 0}
                        sx={{ borderRadius: 2.5, textTransform: "none" }}
                    >
                        {submitting ? "Submitting..." : "Submit Review"}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
