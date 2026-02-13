import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const navItems = [
  { label: "Courses", to: "/courses" },
  { label: "Batches", to: "/batches" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);
  const token = localStorage.getItem("token");
  const isAuth = Boolean(token);
  const dashboardPath = user?.role === "admin" ? "/admin" : user?.role === "instructor" ? "/instructor" : "/dashboard";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(15,23,42,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#0f172a",
              fontWeight: 900,
              fontSize: "1.35rem",
              letterSpacing: "-0.02em",
              fontFamily: "'Merriweather', Georgia, serif",
            }}
          >
            Thaksa
          </Typography>

          <Stack
            direction="row"
            spacing={2.5}
            sx={{ ml: 5, display: { xs: "none", md: "flex" }, flexGrow: 1 }}
          >
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                color="inherit"
                sx={{ color: "#334155", fontWeight: 600 }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          <Stack
            direction="row"
            spacing={1.2}
            sx={{ ml: "auto", display: { xs: "none", md: "flex" } }}
          >
            {!isAuth ? (
              <>
                <Button component={RouterLink} to="/login" sx={{ color: "#1d4ed8", fontWeight: 700 }}>
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" } }}
                >
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to={dashboardPath} sx={{ color: "#1d4ed8", fontWeight: 700 }}>
                  Dashboard
                </Button>
                <Button onClick={handleLogout} color="error" variant="text">
                  Logout
                </Button>
              </>
            )}
          </Stack>

          <IconButton
            edge="end"
            onClick={() => setMobileOpen(true)}
            sx={{ ml: "auto", display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 800 }}>Menu</Typography>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Stack spacing={1}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                sx={{ justifyContent: "flex-start", color: "#334155", fontWeight: 600 }}
              >
                {item.label}
              </Button>
            ))}
            {!isAuth ? (
              <>
                <Button component={RouterLink} to="/login" onClick={() => setMobileOpen(false)}>
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to={dashboardPath} onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Button>
                <Button
                  color="error"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
}
