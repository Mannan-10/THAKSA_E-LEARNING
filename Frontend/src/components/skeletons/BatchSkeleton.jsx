import { Card, CardContent, Box, Skeleton } from "@mui/material";

export default function BatchSkeleton() {
    return (
        <Card
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2.5,
                height: "100%",
            }}
        >
            <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Status Chip Skeleton */}
                <Skeleton variant="rectangular" width={90} height={24} sx={{ borderRadius: 1.5, mb: 1.5 }} />

                {/* Course Title Skeleton */}
                <Skeleton variant="text" width="70%" sx={{ mb: 0.5 }} />

                {/* Rating Skeleton */}
                <Box sx={{ mb: 1.2 }}>
                    <Skeleton variant="rectangular" width={140} height={18} sx={{ borderRadius: 1 }} />
                </Box>

                {/* Batch Name Skeleton */}
                <Skeleton variant="text" sx={{ fontSize: "1.25rem", mb: 1.2 }} />

                {/* Detail Lines Skeleton */}
                <Skeleton variant="text" width="85%" sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="75%" sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="80%" sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="65%" sx={{ mb: 1.8 }} />

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Button Skeleton */}
                <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 2 }} />
            </CardContent>
        </Card>
    );
}
