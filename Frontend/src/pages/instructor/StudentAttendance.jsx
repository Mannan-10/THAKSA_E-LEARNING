import { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    MenuItem,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";
import useToast from "../../hooks/useToast";
import { getInstructorBatches, getBatchAttendanceStats } from "../../services/instructorService";

export default function StudentAttendance() {
    const { showToast } = useToast();
    const [batches, setBatches] = useState([]);
    const [selectedBatchId, setSelectedBatchId] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadBatches = useCallback(async () => {
        try {
            const data = await getInstructorBatches();
            setBatches(Array.isArray(data) ? data : []);
        } catch (err) {
            showToast(err?.response?.data?.message || "Failed to load batches", "error");
        }
    }, [showToast]);

    const loadAttendance = useCallback(async (batchId) => {
        if (!batchId) return;

        try {
            setLoading(true);
            setError("");
            const data = await getBatchAttendanceStats(batchId);
            setAttendanceData(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to load attendance data");
            showToast(err?.response?.data?.message || "Failed to load attendance data", "error");
            setAttendanceData([]);
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        loadBatches();
    }, [loadBatches]);

    useEffect(() => {
        if (selectedBatchId) {
            loadAttendance(selectedBatchId);
        } else {
            setAttendanceData([]);
        }
    }, [selectedBatchId, loadAttendance]);

    // Calculate statistics
    const stats = attendanceData.reduce(
        (acc, student) => {
            const totalSessions = parseInt(student.total_sessions) || 0;
            const attendedSessions = parseInt(student.attended_sessions) || 0;
            const percentage = parseFloat(student.attendance_percentage) || 0;

            acc.totalStudents += 1;
            acc.totalSessions = Math.max(acc.totalSessions, totalSessions);
            acc.totalAttendances += attendedSessions;
            acc.averageAttendance += percentage;

            if (percentage < 75) {
                acc.lowAttendance += 1;
            }

            return acc;
        },
        { totalStudents: 0, totalSessions: 0, totalAttendances: 0, averageAttendance: 0, lowAttendance: 0 }
    );

    if (stats.totalStudents > 0) {
        stats.averageAttendance = (stats.averageAttendance / stats.totalStudents).toFixed(2);
    }

    const getAttendanceColor = (percentage) => {
        if (percentage >= 90) return "success";
        if (percentage >= 75) return "primary";
        if (percentage >= 60) return "warning";
        return "error";
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 0.6 }}>
                Student Attendance
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3.2 }}>
                Track and monitor student attendance across your batches.
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {/* Batch Selector */}
            <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mb: 2.2 }}>
                <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
                    <TextField
                        select
                        label="Select Batch"
                        value={selectedBatchId}
                        onChange={(e) => setSelectedBatchId(e.target.value)}
                        fullWidth
                        helperText="Select a batch to view attendance statistics"
                    >
                        {batches.map((batch) => (
                            <MenuItem key={batch.id} value={batch.id}>
                                {batch.batch_name} (ID: {batch.id})
                            </MenuItem>
                        ))}
                    </TextField>
                </CardContent>
            </Card>

            {selectedBatchId && (
                <>
                    {/* Statistics Cards */}
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 2, mb: 2.2 }}>
                        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
                            <CardContent>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#eff6ff" }}>
                                        <PeopleIcon sx={{ color: "#3b82f6" }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                            {stats.totalStudents}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Students
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
                            <CardContent>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#f0fdf4" }}>
                                        <EventAvailableIcon sx={{ color: "#22c55e" }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                            {stats.totalSessions}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Sessions
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
                            <CardContent>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#fef3c7" }}>
                                        <TrendingUpIcon sx={{ color: "#f59e0b" }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                            {stats.averageAttendance}%
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Average Attendance
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
                            <CardContent>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#fee2e2" }}>
                                        <WarningIcon sx={{ color: "#ef4444" }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                            {stats.lowAttendance}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Low Attendance (&lt;75%)
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Attendance Table */}
                    <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
                        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                                Student Attendance Records
                            </Typography>

                            {loading ? (
                                <Typography color="text.secondary">Loading attendance data...</Typography>
                            ) : attendanceData.length === 0 ? (
                                <Typography color="text.secondary">No students enrolled in this batch yet.</Typography>
                            ) : (
                                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ bgcolor: "#f8fafc" }}>
                                                <TableCell sx={{ fontWeight: 700 }}>Student Name</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 700 }}>Total Sessions</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 700 }}>Attended</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 700 }}>Attendance %</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>Last Attendance</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {attendanceData.map((student) => {
                                                const percentage = parseFloat(student.attendance_percentage) || 0;
                                                return (
                                                    <TableRow
                                                        key={student.student_id}
                                                        sx={{ "&:hover": { bgcolor: "#f8fafc" } }}
                                                    >
                                                        <TableCell>
                                                            <Typography sx={{ fontWeight: 600 }}>{student.name}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {student.email}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {student.total_sessions || 0}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {student.attended_sessions || 0}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={`${percentage}%`}
                                                                color={getAttendanceColor(percentage)}
                                                                size="small"
                                                                sx={{ fontWeight: 600, minWidth: 70 }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {student.last_attendance
                                                                    ? new Date(student.last_attendance).toLocaleDateString()
                                                                    : "Never"}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </CardContent>
                    </Card>
                </>
            )}
        </Box>
    );
}
