import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Box, Button, Card, CardContent, Grid, Skeleton, Stack, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { adminDashboard } from "../../services/adminServices";

const statMeta = [
  { key: "totalUsers", label: "Total Users", color: "#2563eb", icon: <PeopleIcon fontSize="small" /> },
  { key: "students", label: "Students", color: "#3b82f6", icon: <SchoolIcon fontSize="small" /> },
  { key: "instructors", label: "Instructors", color: "#6366f1", icon: <PeopleIcon fontSize="small" /> },
  { key: "totalCourses", label: "Total Courses", color: "#0ea5e9", icon: <MenuBookIcon fontSize="small" /> },
  { key: "pendingCourses", label: "Pending Courses", color: "#dc2626", icon: <PendingActionsIcon fontSize="small" /> },
  { key: "approvedCourses", label: "Approved Courses", color: "#16a34a", icon: <CheckCircleIcon fontSize="small" /> },
  { key: "enrollments", label: "Total Enrollments", color: "#8b5cf6", icon: <SchoolIcon fontSize="small" /> },
  { key: "revenue", label: "Total Revenue", color: "#059669", icon: <AttachMoneyIcon fontSize="small" /> },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async (isBackgroundRefresh = false) => {
    try {
      if (isBackgroundRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const res = await adminDashboard();
      setStats(res);
      setError("");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
    const intervalId = setInterval(() => fetchDashboard(true), 20000);
    const onFocus = () => fetchDashboard(true);
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchDashboard]);

  const values = useMemo(() => {
    return {
      totalUsers: Number(stats?.users?.total || 0),
      students: Number(stats?.users?.students || 0),
      instructors: Number(stats?.users?.instructors || 0),
      totalCourses: Number(stats?.courses?.total || 0),
      pendingCourses: Number(stats?.courses?.pending || 0),
      approvedCourses: Number(stats?.courses?.approved || 0),
      enrollments: Number(stats?.enrollments || 0),
      revenue: Number(stats?.revenue || 0),
    };
  }, [stats]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>Admin Dashboard</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Platform overview and operational metrics.
      </Typography>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1.4 }}>
        <Button size="small" variant="outlined" onClick={() => fetchDashboard(true)} disabled={refreshing}>
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </Stack>

      {error ? <Alert severity="error" sx={{ mb: 2.2 }}>{error}</Alert> : null}

      <Grid container spacing={2.2}>
        {(loading ? Array.from({ length: 8 }).map((_, idx) => ({ loadingKey: idx })) : statMeta).map((item, index) => (
          <Grid key={item.key || item.loadingKey || index} size={{ xs: 12, sm: 6, lg: 3 }}>
            {loading ? (
              <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
                <CardContent>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" height={44} />
                </CardContent>
              </Card>
            ) : (
              <StatCard
                label={item.label}
                value={values[item.key]}
                icon={item.icon}
                color={item.color}
                isCurrency={item.key === "revenue"}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function StatCard({ label, value, icon, color, isCurrency = false }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = Number(value || 0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = numericValue / Math.max(1, duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        clearInterval(counter);
        setDisplayValue(numericValue);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [numericValue]);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e2e8f0",
        borderTop: `4px solid ${color}`,
        boxShadow: "0 10px 24px rgba(15,23,42,0.05)",
        transition: "transform .22s ease, box-shadow .22s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 34px rgba(15,23,42,0.12)",
        },
      }}
    >
      <CardContent sx={{ p: 2.2 }}>
        <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 1.2 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1.8,
              bgcolor: color,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
        </Stack>
        <Typography variant="h5" sx={{ fontWeight: 900, color }}>
          {isCurrency ? `INR ${displayValue.toLocaleString()}` : displayValue.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
