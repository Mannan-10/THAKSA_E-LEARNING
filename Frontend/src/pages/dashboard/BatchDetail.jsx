import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { getMyBatch } from "../../services/batchService";

const statusStyles = {
    upcoming: { bg: "#dcfce7", color: "#166534" },
    started: { bg: "#e0e7ff", color: "#3730a3" },
    completed: { bg: "#f1f5f9", color: "#475569" },
};

export default function BatchDetail() {
    const { batchId } = useParams();
    const navigate = useNavigate();
    const [batch, setBatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        const loadBatch = async () => {
            try {
                setLoading(true);
                const data = await getMyBatch();
                if (!active) return;
                const allBatches = Array.isArray(data) ? data : [];
                const found = allBatches.find((b) => String(b.id) === String(batchId));
                if (found) {
                    setBatch(found);
                } else {
                    setError("Batch not found");
                }
            } catch (err) {
                if (active) setError("Failed to load batch details");
            } finally {
                if (active) setLoading(false);
            }
        };
        loadBatch();
        return () => { active = false; };
    }, [batchId]);

    if (loading) {
        return (
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ py: 4 }}>
                <CircularProgress size={20} />
                <Typography color="text.secondary">Loading batch details...</Typography>
            </Stack>
        );
    }

    if (error || !batch) {
        return (
            <Box>
                <Button
                    startIcon={<ArrowBackRoundedIcon />}
                    onClick={() => navigate("/dashboard/batch")}
                    sx={{ mb: 2, textTransform: "none" }}
                >
                    Back to My Batches
                </Button>
                <Alert severity="error">{error || "Batch not found"}</Alert>
            </Box>
        );
    }

    const status = (batch.status || "upcoming").toLowerCase();
    const sStyle = statusStyles[status] || statusStyles.upcoming;

    return (
        <Box>
            <Button
                startIcon={<ArrowBackRoundedIcon />}
                onClick={() => navigate("/dashboard/batch")}
                sx={{ mb: 2, textTransform: "none", fontWeight: 600 }}
            >
                Back to My Batches
            </Button>

            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 14px 26px rgba(15,23,42,0.05)",
                }}
            >
                <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={1.5} sx={{ mb: 3 }}>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "1.3rem", md: "1.5rem" } }}>
                                {batch.title || batch.batch_name}
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                                Batch: {batch.batch_name}
                            </Typography>
                        </Box>
                        <Chip
                            label={batch.status || "Upcoming"}
                            sx={{
                                fontWeight: 700,
                                textTransform: "capitalize",
                                bgcolor: sStyle.bg,
                                color: sStyle.color,
                                alignSelf: { xs: "flex-start", sm: "center" },
                            }}
                        />
                    </Stack>

                    <Grid container spacing={2.5}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <InfoItem icon={<GroupsRoundedIcon />} label="Course" value={batch.title || "N/A"} />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 6 }}>
                            <InfoItem icon={<CalendarMonthRoundedIcon />} label="Start Date" value={batch.start_date ? new Date(batch.start_date).toLocaleDateString() : "N/A"} />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 6 }}>
                            <InfoItem icon={<CalendarMonthRoundedIcon />} label="End Date" value={batch.end_date ? new Date(batch.end_date).toLocaleDateString() : "N/A"} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <InfoItem
                                icon={<ScheduleRoundedIcon />}
                                label="Schedule"
                                value={batch.schedule || `${batch.days_of_week || "TBA"} | ${batch.session_time || "TBA"}`}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 6 }}>
                            <InfoItem label="Mode" value="Live + Recorded" />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <Box>
            <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 0.4 }}>
                {icon && <Box sx={{ color: "#64748b", display: "flex" }}>{icon}</Box>}
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {label}
                </Typography>
            </Stack>
            <Typography sx={{ fontWeight: 700, color: "#0f172a", pl: icon ? 3.5 : 0 }}>
                {value}
            </Typography>
        </Box>
    );
}
