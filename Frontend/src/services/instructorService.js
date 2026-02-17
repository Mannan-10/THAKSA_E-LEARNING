import api from "../api/axios.js";

export const getInstructorStats = async () => {
    const response = await api.get('/instructor/dashboard');
    return response.data;
};

export const getInstructorCourses = async () => {
    const response = await api.get("/instructor/courses");
    return response.data;
};

export const createInstructorCourse = async (data) => {
    const response = await api.post("/instructor/courses", data);
    return response.data;
};

export const toggleInstructorCourseActive = async (courseId, isActive) => {
    const response = await api.put(`/instructor/courses/${courseId}/toggle-active`, {
        is_active: isActive
    });
    return response.data;
};

export const getInstructorBatches = async () => {
    const response = await api.get("/instructor/batches");
    return response.data;
};

export const createInstructorBatch = async (courseId, data) => {
    const response = await api.post(`/instructor/courses/${courseId}/batches`, data);
    return response.data;
};

export const getInstructorSessions = async () => {
    const response = await api.get("/instructor/sessions");
    return response.data;
};

export const createInstructorSession = async (batchId, data) => {
    const response = await api.post(`/instructor/batches/${batchId}/sessions`, data);
    return response.data;
};

export const startInstructorSession = async (sessionId) => {
    const response = await api.post(`/instructor/sessions/${sessionId}/start`);
    return response.data;
};

export const endInstructorSession = async (sessionId) => {
    const response = await api.post(`/instructor/sessions/${sessionId}/end`);
    return response.data;
};

export const cancelInstructorSession = async (sessionId) => {
    const response = await api.post(`/instructor/sessions/${sessionId}/cancel`);
    return response.data;
};

export const getBatchStudents = async (batchId) => {
    const response = await api.get(`/instructor/batches/${batchId}/students`);
    return response.data;
};

export const removeStudentFromBatch = async (batchId, studentId) => {
    const response = await api.delete(`/instructor/batches/${batchId}/students/${studentId}`);
    return response.data;
};

export const getInstructorSessionAttendance = async (sessionId) => {
    const response = await api.get(`/instructor/sessions/${sessionId}/attendance`);
    return response.data;
};

export const updateInstructorAttendance = async (sessionId, studentId, status) => {
    const response = await api.put(`/instructor/sessions/${sessionId}/attendance`, {
        studentId,
        status,
    });
    return response.data;
};

// Module Management
export const getInstructorCourseModules = async (courseId) => {
    const response = await api.get(`/courses/${courseId}/modules`);
    return response.data;
};

export const createInstructorModule = async (courseId, data) => {
    const response = await api.post(`/courses/${courseId}/modules`, data);
    return response.data;
};

export const updateInstructorModule = async (moduleId, data) => {
    const response = await api.put(`/courses/modules/${moduleId}`, data);
    return response.data;
};

export const deleteInstructorModule = async (moduleId) => {
    const response = await api.delete(`/courses/modules/${moduleId}`);
    return response.data;
};

// Lesson Management
export const getInstructorModuleLessons = async (moduleId) => {
    const response = await api.get(`/lessons/${moduleId}/lessons`);
    return response.data;
};

export const createInstructorLesson = async (moduleId, data) => {
    const response = await api.post(`/lessons/${moduleId}/lessons`, data);
    return response.data;
};

export const updateInstructorLesson = async (lessonId, data) => {
    const response = await api.put(`/lessons/lessons/${lessonId}`, data);
    return response.data;
};

export const deleteInstructorLesson = async (lessonId) => {
    const response = await api.delete(`/lessons/lessons/${lessonId}`);
    return response.data;
};

// Batch Attendance Statistics
export const getBatchAttendanceStats = async (batchId) => {
    const response = await api.get(`/instructor/batches/${batchId}/attendance`);
    return response.data;
};
