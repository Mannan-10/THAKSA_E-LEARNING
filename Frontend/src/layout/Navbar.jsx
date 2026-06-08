import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import brandLogo from "../pages/HomePage/sections/skillforge-no-border.png";
import { getNavContext } from "../config/navConfig";
import { siteConfig } from "../config/siteConfig";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
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
  const navContext = getNavContext(location.pathname);
  const navItems = navContext.menu;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      <AppBar
        position={navContext.fixed ? "fixed" : "static"}
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(15,23,42,0.08)",
          boxShadow: "0 2px 12px rgba(15, 23, 42, 0.06)",
        }}
      >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.1,
              textDecoration: "none",
              color: "#0f172a",
            }}
          >
            <Box
              component="img"
              src={brandLogo}
              alt="SkillForge Logo"
              sx={{
                width: { xs: 34, md: 40 },
                height: { xs: 34, md: 40 },
                borderRadius: 1.5,
                objectFit: "cover",
              }}
            />
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.2rem", md: "1.35rem" },
                letterSpacing: "-0.02em",
                fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                color: "#0f172a",
              }}
            >
              {siteConfig.shortBrandName}
            </Typography>
          </Box>

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
                sx={{
                  color: isActive(item.to) ? "#1d4ed8" : "#334155",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scaleY(1.05)",
                    bgcolor: "transparent",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 6,
                    left: 8,
                    width: isActive(item.to) ? "calc(100% - 16px)" : 0,
                    height: "2px",
                    bgcolor: "#2563eb",
                    borderRadius: 1,
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "calc(100% - 16px)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          <Stack
            direction="row"
            spacing={1.2}
            sx={{ ml: "auto", display: { xs: "none", md: isAuth || navContext.authVisible ? "flex" : "none" } }}
          >
            {!isAuth ? (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{ color: "#1d4ed8", fontWeight: 700, fontSize: "1rem", textTransform: "none" }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  sx={{ bgcolor: "#2563eb", fontSize: "1rem", textTransform: "none", "&:hover": { bgcolor: "#1d4ed8" } }}
                >
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to={dashboardPath}
                  sx={{ color: "#1d4ed8", fontWeight: 700, fontSize: "1rem", textTransform: "none" }}
                >
                  Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  color="error"
                  variant="text"
                  sx={{ fontSize: "1rem", textTransform: "none" }}
                >
                  Logout
                </Button>
              </>
            )}
          </Stack>

          <IconButton
            edge="end"
            onClick={() => setMobileOpen(true)}
            sx={{
              ml: "auto",
              display: { xs: "inline-flex", md: "none" },
              width: 44,
              height: 44,
            }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        SlideProps={{ direction: "left" }}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "85vw", sm: 320 },
            maxWidth: 360,
          },
        }}
      >
        <Box sx={{ p: 2.5, height: "100%", display: "flex", flexDirection: "column" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Stack direction="row" spacing={1.1} alignItems="center">
                <Box
                  component="img"
                  src={brandLogo}
                  alt="SkillForge Logo"
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 1.2,
                  objectFit: "cover",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.25rem",
                  color: "#0f172a",
                  fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                }}
              >
                {siteConfig.shortBrandName}
              </Typography>
            </Stack>
            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{ width: 44, height: 44 }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 1.5 }} />

          <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    justifyContent: "flex-start",
                    color: active ? "#1d4ed8" : "#334155",
                    bgcolor: active ? "rgba(37,99,235,0.08)" : "transparent",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    textTransform: "none",
                    py: 1.4,
                    px: 2,
                    borderRadius: 2,
                    minHeight: 48,
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "scaleY(1.05)",
                      bgcolor: active ? "rgba(37,99,235,0.12)" : "rgba(15,23,42,0.04)",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 6,
                      left: 16,
                      width: active ? "calc(100% - 32px)" : 0,
                      height: "2px",
                      bgcolor: "#2563eb",
                      borderRadius: 1,
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "calc(100% - 32px)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Stack spacing={1} sx={{ display: isAuth || navContext.authVisible ? "flex" : "none" }}>
            {!isAuth ? (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    fontSize: "1rem",
                    textTransform: "none",
                    py: 1.2,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    minHeight: 48,
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  fullWidth
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    fontSize: "1rem",
                    textTransform: "none",
                    py: 1.2,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    bgcolor: "#2563eb",
                    minHeight: 48,
                    "&:hover": { bgcolor: "#1d4ed8" },
                  }}
                >
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to={dashboardPath}
                  onClick={() => setMobileOpen(false)}
                  variant="contained"
                  fullWidth
                  sx={{
                    fontSize: "1rem",
                    textTransform: "none",
                    py: 1.2,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    bgcolor: "#2563eb",
                    minHeight: 48,
                    "&:hover": { bgcolor: "#1d4ed8" },
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  sx={{
                    fontSize: "1rem",
                    textTransform: "none",
                    py: 1.2,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    minHeight: 48,
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
      {navContext.fixed && <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />}
    </>
  );
}
