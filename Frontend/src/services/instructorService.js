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
