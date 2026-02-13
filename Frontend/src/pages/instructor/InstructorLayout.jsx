import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const drawerWidth = 268;

const navItems = [
  { to: "/instructor", label: "Dashboard", icon: <DashboardRoundedIcon fontSize="small" /> },
  { to: "/instructor/batches", label: "Manage Batches", icon: <GroupsRoundedIcon fontSize="small" /> },
  { to: "/instructor/courses", label: "Manage Courses", icon: <MenuBookRoundedIcon fontSize="small" /> },
  { to: "/instructor/students", label: "Students", icon: <SchoolRoundedIcon fontSize="small" /> },
  { to: "/instructor/profile", label: "Profile", icon: <PersonRoundedIcon fontSize="small" /> },
  { to: "/instructor/settings", label: "Settings", icon: <SettingsRoundedIcon fontSize="small" /> },
];

export default function InstructorLayout() {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const drawerContent = (
    <Box sx={{ p: 2 }}>
      <Typography
        sx={{
          mb: 2.5,
          fontSize: "1.35rem",
          fontWeight: 900,
          color: "#0f172a",
          fontFamily: "'Merriweather', Georgia, serif",
        }}
      >
        Thaksa Instructor
      </Typography>

      <List sx={{ p: 0 }}>
        {navItems.map((item) => {
          const selected = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
          return (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              selected={selected}
              sx={{
                mb: 0.6,
                borderRadius: 2,
                "&.Mui-selected": {
                  bgcolor: "rgba(37,99,235,0.12)",
                  color: "#1d4ed8",
                },
              }}
            >
              <Stack direction="row" spacing={1.2} alignItems="center">
                {item.icon}
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 700, fontSize: "0.98rem" }} />
              </Stack>
            </ListItemButton>
          );
        })}
      </List>

      <Button fullWidth startIcon={<LogoutRoundedIcon />} color="error" variant="outlined" onClick={handleLogout} sx={{ mt: 2, borderRadius: 2 }}>
        Logout
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f8ff" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          borderBottom: "1px solid rgba(15,23,42,0.08)",
          bgcolor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar sx={{ minHeight: 68 }}>
          <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: "none" }, mr: 1 }}>
            <MenuRoundedIcon />
          </IconButton>
          <Box>
            <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>Instructor Console</Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.name ? `${user.name} | Course and student operations` : "Course and student operations"}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid rgba(15,23,42,0.08)",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar sx={{ minHeight: 68 }} />
        <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
