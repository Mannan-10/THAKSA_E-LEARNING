import { Box, Button, Typography } from "@mui/material";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import FolderOffRoundedIcon from "@mui/icons-material/FolderOffRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";

const iconMap = {
    inbox: InboxRoundedIcon,
    search: SearchOffRoundedIcon,
    folder: FolderOffRoundedIcon,
    review: RateReviewRoundedIcon,
};

export default function EmptyState({
    icon = "inbox",
    title = "Nothing here yet",
    description = "No items to display",
    actionLabel,
    onAction,
}) {
    const IconComponent = iconMap[icon] || InboxRoundedIcon;

    return (
        <Box
            sx={{
                py: 8,
                px: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <IconComponent
                sx={{
                    fontSize: 80,
                    color: "#cbd5e1",
                    mb: 2,
                }}
            />

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#475569" }}>
                {title}
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: actionLabel ? 3 : 0, maxWidth: 400 }}
            >
                {description}
            </Typography>

            {actionLabel && onAction && (
                <Button
                    variant="contained"
                    onClick={onAction}
                    sx={{ textTransform: "none", borderRadius: 2.5 }}
                >
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
}
