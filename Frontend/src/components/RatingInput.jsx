import { Box } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { useState } from "react";

export default function RatingInput({ value = 0, onChange, size = "large" }) {
    const [hover, setHover] = useState(0);

    const sizeMap = {
        medium: 32,
        large: 40,
    };

    const iconSize = sizeMap[size] || sizeMap.large;

    const handleClick = (rating) => {
        if (onChange) {
            onChange(rating);
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 0.5 }}>
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hover || value);
                return (
                    <Box
                        key={star}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        sx={{
                            cursor: "pointer",
                            transition: "transform 0.2s",
                            "&:hover": {
                                transform: "scale(1.1)",
                            },
                        }}
                    >
                        {isFilled ? (
                            <StarRoundedIcon sx={{ fontSize: iconSize, color: "#fbbf24" }} />
                        ) : (
                            <StarOutlineRoundedIcon sx={{ fontSize: iconSize, color: "#d1d5db" }} />
                        )}
                    </Box>
                );
            })}
        </Box>
    );
}
