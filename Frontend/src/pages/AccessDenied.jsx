import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

export default function AccessDenied() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

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
                    <LockRoundedIcon
                        sx={{ fontSize: 120, color: "#f59e0b", mb: 2 }}
                    />

                    <Typography variant="h1" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: 64, md: 96 } }}>
                        403
                    </Typography>

                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        Access Denied
                    </Typography>

                    <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 480, mx: "auto" }}>
                        {isLoggedIn
                            ? "You don't have permission to access this page. If you believe this is an error, please contact support."
                            : "You need to be logged in to access this page. Please log in to continue."}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                        {!isLoggedIn ? (
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<LoginRoundedIcon />}
                                onClick={() => navigate("/login")}
                                sx={{ textTransform: "none", borderRadius: 2.5 }}
                            >
                                Log In
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<HomeRoundedIcon />}
                                onClick={() => navigate("/")}
                                sx={{ textTransform: "none", borderRadius: 2.5 }}
                            >
                                Go to Homepage
                            </Button>
                        )}

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate(-1)}
                            sx={{ textTransform: "none", borderRadius: 2.5 }}
                        >
                            Go Back
                        </Button>
                    </Box>

                    {isLoggedIn && (
                        <Box sx={{ mt: 5 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                                Need help?
                            </Typography>
                            <Button
                                size="small"
                                onClick={() => navigate("/contact")}
                                sx={{ textTransform: "none" }}
                            >
                                Contact Support
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
}
