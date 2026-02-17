import { Box, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

export default function RatingStars({ rating = 0, size = "medium", showNumber = false, reviewCount = 0 }) {
    const sizeMap = {
        small: 16,
        medium: 20,
        large: 28,
    };

    const iconSize = sizeMap[size] || sizeMap.medium;
    const fontSize = size === "large" ? "body1" : "body2";

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <StarRoundedIcon
                    key={`full-${i}`}
                    sx={{ fontSize: iconSize, color: "#fbbf24" }}
                />
            );
        }

        // Half star
        if (hasHalfStar && fullStars < 5) {
            stars.push(
                <StarHalfRoundedIcon
                    key="half"
                    sx={{ fontSize: iconSize, color: "#fbbf24" }}
                />
            );
        }

        // Empty stars
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <StarOutlineRoundedIcon
                    key={`empty-${i}`}
                    sx={{ fontSize: iconSize, color: "#d1d5db" }}
                />
            );
        }

        return stars;
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.1 }}>
                {renderStars()}
            </Box>
            {showNumber && (
                <Typography variant={fontSize} sx={{ fontWeight: 600, color: "#374151" }}>
                    {rating.toFixed(1)}
                    {reviewCount > 0 && (
                        <Typography component="span" variant={fontSize} sx={{ color: "text.secondary", ml: 0.5 }}>
                            ({reviewCount})
                        </Typography>
                    )}
                </Typography>
            )}
        </Box>
    );
}
