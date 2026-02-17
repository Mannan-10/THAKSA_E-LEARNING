import { Box, Card, CardContent, Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RatingStars from "./RatingStars";

export default function ReviewCard({ review }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    return (
        <Card elevation={0} sx={{ borderRadius: 2.5, border: "1px solid #e2e8f0" }}>
            <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                bgcolor: "#e0e7ff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <PersonRoundedIcon sx={{ fontSize: 20, color: "#3730a3" }} />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                {review.student_name || "Anonymous"}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {formatDate(review.created_at)}
                            </Typography>
                        </Box>
                    </Box>
                    <RatingStars rating={review.rating} size="small" />
                </Box>

                {review.comment && (
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {review.comment}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
