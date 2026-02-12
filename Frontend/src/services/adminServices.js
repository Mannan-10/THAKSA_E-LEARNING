import api from "../api/axios.js";

export const adminDashboard = async () => {
    const response = await api.get("/admin/dashboard");
    return response.data;
}

export const getPendingCourses = async () => {
    const response = await api.get("/admin/courses/pending");
    return response.data;
};

export const approveCourse = async (id) => {
    const response = await api.put(`/admin/courses/${id}/approve`);
    return response.data;
};

export const rejectCourse = async (id) => {
    const response = await api.put(`/admin/courses/${id}/reject`);
    return response.data;
}

export const getApprovedCourses = async () => {
    const response = await api.get('/admin/courses/approved');
    return response.data;
};

export const getRejectedCourses = async () => {
    const response = await api.get('/admin/courses/rejected');
    return response.data;
};

export const getAllUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
}

export const getUserById = async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
}

export const updateUserRole = async (id, role) => {
    const response = await api.put(`/admin/users/${id}/${role}`);
    return response.data;
}

export const deleteUserById = async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
}