import { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import useToast from "../../hooks/useToast";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
    getInstructorCourses,
    getInstructorCourseModules,
    createInstructorModule,
    updateInstructorModule,
    deleteInstructorModule,
    getInstructorModuleLessons,
    createInstructorLesson,
    updateInstructorLesson,
    deleteInstructorLesson,
} from "../../services/instructorService";

export default function ManageCourseContent() {
    const { showToast } = useToast();
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [modules, setModules] = useState([]);
    const [lessons, setLessons] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Module state
    const [moduleDialog, setModuleDialog] = useState({ open: false, mode: "create", data: null });
    const [moduleForm, setModuleForm] = useState({ title: "", order_number: "" });

    // Lesson state
    const [lessonDialog, setLessonDialog] = useState({ open: false, mode: "create", data: null, moduleId: null });
    const [lessonForm, setLessonForm] = useState({ title: "", video_url: "", duration: "", order_number: "" });
    const [confirmState, setConfirmState] = useState({ open: false, type: null, id: null });

    const loadCourses = useCallback(async () => {
        try {
            const data = await getInstructorCourses();
            setCourses(Array.isArray(data) ? data : []);
        } catch (err) {
            showToast(err?.response?.data?.message || "Failed to load courses", "error");
        }
    }, [showToast]);

    const loadModules = useCallback(async (courseId) => {
        if (!courseId) return;

        try {
            setLoading(true);
            setError("");
            const data = await getInstructorCourseModules(courseId);
            setModules(Array.isArray(data) ? data : []);

            // Load lessons for all modules
            const lessonsData = {};
            for (const module of data) {
                const moduleLessons = await getInstructorModuleLessons(module.id);
                lessonsData[module.id] = Array.isArray(moduleLessons) ? moduleLessons : [];
            }
            setLessons(lessonsData);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to load modules");
            showToast(err?.response?.data?.message || "Failed to load modules", "error");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    useEffect(() => {
        if (selectedCourseId) {
            loadModules(selectedCourseId);
        } else {
            setModules([]);
            setLessons({});
        }
    }, [selectedCourseId, loadModules]);

    // Module handlers
    const handleOpenModuleDialog = (mode, module = null) => {
        if (mode === "edit" && module) {
            setModuleForm({ title: module.title, order_number: module.order_number });
            setModuleDialog({ open: true, mode, data: module });
        } else {
            setModuleForm({ title: "", order_number: modules.length + 1 });
            setModuleDialog({ open: true, mode: "create", data: null });
        }
    };

    const handleCloseModuleDialog = () => {
        setModuleDialog({ open: false, mode: "create", data: null });
        setModuleForm({ title: "", order_number: "" });
    };

    const handleSaveModule = async () => {
        if (!moduleForm.title) {
            showToast("Module title is required", "error");
            return;
        }

        try {
            if (moduleDialog.mode === "create") {
                await createInstructorModule(selectedCourseId, moduleForm);
                showToast("Module created successfully", "success");
            } else {
                await updateInstructorModule(moduleDialog.data.id, moduleForm);
                showToast("Module updated successfully", "success");
            }
            handleCloseModuleDialog();
            await loadModules(selectedCourseId);
        } catch (err) {
            showToast(err?.response?.data?.message || "Failed to save module", "error");
        }
    };

    const handleDeleteModule = async (moduleId) => {
        try {
            await deleteInstructorModule(moduleId);
            showToast("Module deleted successfully", "success");
            await loadModules(selectedCourseId);
        } catch (err) {
            showToast(err?.response?.data?.message || "Failed to delete module", "error");
        }
    };

    // Lesson handlers
    const handleOpenLessonDialog = (moduleId, mode, lesson = null) => {
        const moduleLessons = lessons[moduleId] || [];

        if (mode === "edit" && lesson) {
            setLessonForm({
                title: lesson.title,
                video_url: lesson.video_url,
                duration: lesson.duration,
                order_number: lesson.order_number,
            });
            setLessonDialog({ open: true, mode, data: lesson, moduleId });
        } else {
            setLessonForm({
                title: "",
                video_url: "",
                duration: "",
                order_number: moduleLessons.length + 1,
            });
            setLessonDialog({ open: true, mode: "create", data: null, moduleId });
        }
    };

    const handleCloseLessonDialog = () => {
        setLessonDialog({ open: false, mode: "create", data: null, moduleId: null });
        setLessonForm({ title: "", video_url: "", duration: "", order_number: "" });
    };

    const handleSaveLesson = async () => {
        if (!lessonForm.title) {
            showToast("Lesson title is required", "error");
            return;
        }

        try {
            if (lessonDialog.mode === "create") {
                await createInstructorLesson(lessonDialog.moduleId, lessonForm);
                showToast("Lesson created successfully", "success");
            } else {
                await updateInstructorLesson(lessonDialog.data.id, lessonForm);
                showToast("Lesson updated successfully", "success");
            }
            handleCloseLessonDialog();
            await loadModules(selectedCourseId);
        } catch (err) {
            showToast(err?.response?.data?.message || "Failed to save lesson", "error");
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        try {
            await deleteInstructorLesson(lessonId);
            showToast("Lesson deleted successfully", "success");
            await loadModules(selectedCourseId);
        } catch (err) {
            showToast(err?.response?.data?.message || "Failed to delete lesson", "error");
        }
    };

    const openDeleteConfirm = (type, id) => {
        setConfirmState({ open: true, type, id });
    };

    const closeDeleteConfirm = () => {
        setConfirmState({ open: false, type: null, id: null });
    };

    const handleConfirmDelete = async () => {
        const { type, id } = confirmState;
        closeDeleteConfirm();
        if (!id) return;
        if (type === "module") {
            await handleDeleteModule(id);
            return;
        }
        if (type === "lesson") {
            await handleDeleteLesson(id);
        }
    };

    const approvedCourses = courses.filter((c) => (c.approval_status || "").toLowerCase() === "approved");

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 0.6 }}>
                Manage Course Content
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3.2 }}>
                Create and organize modules and lessons for your courses.
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {/* Course Selector */}
            <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mb: 2.2 }}>
                <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
                    <TextField
                        select
                        label="Select Course"
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(e.target.value)}
                        fullWidth
                        helperText="Only approved courses are shown"
                    >
                        {approvedCourses.map((course) => (
                            <MenuItem key={course.id} value={course.id}>
                                {course.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </CardContent>
            </Card>

            {selectedCourseId && (
                <>
                    {/* Modules Section */}
                    <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", mb: 2.2 }}>
                        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                    Modules
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => handleOpenModuleDialog("create")}
                                    sx={{ textTransform: "none" }}
                                >
                                    Add Module
                                </Button>
                            </Stack>

                            {loading ? (
                                <Typography color="text.secondary">Loading modules...</Typography>
                            ) : modules.length === 0 ? (
                                <Typography color="text.secondary">No modules created yet. Click 'Add Module' to get started.</Typography>
                            ) : (
                                <Stack spacing={2}>
                                    {modules.map((module) => (
                                        <Card key={module.id} variant="outlined" sx={{ borderRadius: 2 }}>
                                            <CardContent>
                                                <Stack direction="row" justifyContent="space-between" alignItems="start" sx={{ mb: 1.5 }}>
                                                    <Box>
                                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                            {module.order_number}. {module.title}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Module ID: {module.id}
                                                        </Typography>
                                                    </Box>
                                                    <Stack direction="row" spacing={1}>
                                                        <IconButton
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => handleOpenModuleDialog("edit", module)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() => openDeleteConfirm("module", module.id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </Stack>

                                                {/* Lessons in this module */}
                                                <Box sx={{ mt: 2, pl: 2, borderLeft: "3px solid #e2e8f0" }}>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                            Lessons ({(lessons[module.id] || []).length})
                                                        </Typography>
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            startIcon={<AddIcon />}
                                                            onClick={() => handleOpenLessonDialog(module.id, "create")}
                                                            sx={{ textTransform: "none" }}
                                                        >
                                                            Add Lesson
                                                        </Button>
                                                    </Stack>

                                                    {(lessons[module.id] || []).length === 0 ? (
                                                        <Typography variant="body2" color="text.secondary">
                                                            No lessons yet
                                                        </Typography>
                                                    ) : (
                                                        <Stack spacing={1}>
                                                            {(lessons[module.id] || []).map((lesson) => (
                                                                <Box
                                                                    key={lesson.id}
                                                                    sx={{
                                                                        p: 1.5,
                                                                        bgcolor: "#f8fafc",
                                                                        borderRadius: 1,
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "start",
                                                                    }}
                                                                >
                                                                    <Box>
                                                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                                            {lesson.order_number}. {lesson.title}
                                                                        </Typography>
                                                                        <Typography variant="caption" color="text.secondary">
                                                                            Duration: {String(lesson.duration || "N/A")} | ID: {String(lesson.id)}
                                                                        </Typography>
                                                                        {lesson.video_url && (
                                                                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                                                                                Video: {String(lesson.video_url).substring(0, 50)}...
                                                                            </Typography>
                                                                        )}
                                                                    </Box>
                                                                    <Stack direction="row" spacing={0.5}>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="primary"
                                                                            onClick={() => handleOpenLessonDialog(module.id, "edit", lesson)}
                                                                        >
                                                                            <EditIcon fontSize="small" />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="error"
                                                                            onClick={() => openDeleteConfirm("lesson", lesson.id)}
                                                                        >
                                                                            <DeleteIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Stack>
                                                                </Box>
                                                            ))}
                                                        </Stack>
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Stack>
                            )}
                        </CardContent>
                    </Card>
                </>
            )}

            {/* Module Dialog */}
            <Dialog open={moduleDialog.open} onClose={handleCloseModuleDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {moduleDialog.mode === "create" ? "Add Module" : "Edit Module"}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Module Title"
                            value={moduleForm.title}
                            onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Order Number"
                            type="number"
                            value={moduleForm.order_number}
                            onChange={(e) => setModuleForm({ ...moduleForm, order_number: e.target.value })}
                            fullWidth
                            helperText="Determines the display order of modules"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModuleDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveModule}>
                        {moduleDialog.mode === "create" ? "Create" : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Lesson Dialog */}
            <Dialog open={lessonDialog.open} onClose={handleCloseLessonDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {lessonDialog.mode === "create" ? "Add Lesson" : "Edit Lesson"}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Lesson Title"
                            value={lessonForm.title}
                            onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Video URL"
                            value={lessonForm.video_url}
                            onChange={(e) => setLessonForm({ ...lessonForm, video_url: e.target.value })}
                            fullWidth
                            helperText="YouTube, Vimeo, or direct video link"
                        />
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <TextField
                                label="Duration"
                                value={lessonForm.duration}
                                onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                                fullWidth
                                placeholder="e.g., 15m or 1h 30m"
                            />
                            <TextField
                                label="Order Number"
                                type="number"
                                value={lessonForm.order_number}
                                onChange={(e) => setLessonForm({ ...lessonForm, order_number: e.target.value })}
                                fullWidth
                            />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseLessonDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveLesson}>
                        {lessonDialog.mode === "create" ? "Create" : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={confirmState.open}
                onClose={closeDeleteConfirm}
                onConfirm={handleConfirmDelete}
                title={confirmState.type === "module" ? "Delete Module" : "Delete Lesson"}
                description={
                    confirmState.type === "module"
                        ? "Are you sure you want to delete this module? This will also delete all lessons in it."
                        : "Are you sure you want to delete this lesson?"
                }
                confirmText="Delete"
                confirmColor="error"
            />
        </Box>
    );
}
