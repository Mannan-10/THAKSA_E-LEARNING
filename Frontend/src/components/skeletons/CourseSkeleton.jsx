import { Card, CardContent, Chip, Box, Skeleton } from "@mui/material";

export default function CourseSkeleton() {
    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2.5,
            }}
        >
            <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Chip Skeleton */}
                <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 1.5, mb: 1.4 }} />

                {/* Title Skeleton */}
                <Skeleton variant="text" sx={{ fontSize: "1.25rem", mb: 0.4 }} />

                {/* Rating Stars Skeleton */}
                <Box sx={{ mb: 0.6 }}>
                    <Skeleton variant="rectangular" width={150} height={20} sx={{ borderRadius: 1 }} />
                </Box>

                {/* Instructor Skeleton */}
                <Skeleton variant="text" width="60%" sx={{ mb: 0.6 }} />

                {/* Description Skeleton */}
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="80%" sx={{ mb: 1.5 }} />

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Button Skeleton */}
                <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 2 }} />
            </CardContent>
        </Card>
    );
}
