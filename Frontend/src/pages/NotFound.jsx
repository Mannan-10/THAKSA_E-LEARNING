import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f8fafc",
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                <Box sx={{ textAlign: "center" }}>
                    <ErrorOutlineRoundedIcon
                        sx={{ fontSize: 120, color: "#ef4444", mb: 2 }}
                    />

                    <Typography variant="h1" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: 64, md: 96 } }}>
                        404
                    </Typography>

                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        Page Not Found
                    </Typography>

                    <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 480, mx: "auto" }}>
                        The page you're looking for doesn't exist or has been moved.
                        Please check the URL or return to the homepage.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<HomeRoundedIcon />}
                            onClick={() => navigate("/")}
                            sx={{ textTransform: "none", borderRadius: 2.5 }}
                        >
                            Go to Homepage
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate(-1)}
                            sx={{ textTransform: "none", borderRadius: 2.5 }}
                        >
                            Go Back
                        </Button>
                    </Box>

                    <Box sx={{ mt: 5 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                            Quick Links:
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                            <Button
                                size="small"
                                onClick={() => navigate("/courses")}
                                sx={{ textTransform: "none" }}
                            >
                                Browse Courses
                            </Button>
                            <Button
                                size="small"
                                onClick={() => navigate("/batches")}
                                sx={{ textTransform: "none" }}
                            >
                                View Batches
                            </Button>
                            <Button
                                size="small"
                                onClick={() => navigate("/contact")}
                                sx={{ textTransform: "none" }}
                            >
                                Contact Support
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
