import api from "../api/axios.js"

export const login = async (data) => {
    const response = await api.post("/users/login", data);
    return response.data;
};

export const verifyOtp = async (data) => {
    const response = await api.post("/users/verify-otp", data);
    return response.data;
};

export const register = async (data) => {
    const response = await api.post("/users/register", data);
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get("/users/profile");
    return response.data.profile;
};

export const updateProfile = async (data) => {
    const response = await api.put("/users/profile", data);
    return response.data;
};

export const changePassword = async (data) => {
    const response = await api.put("/users/change-password", data);
    return response.data;
};

export const getUserDashboard = async () => {
    const response = await api.get("/users/dashboard");
    return response.data;
};

export const getApprovedCourses = async () => {
    const response = await api.get("/courses");
    return response.data;
};

export const getPublicCourses = async ({search, level, page, limit}) => {
    const response = await api.get("/courses/public", {
        params: {
            search,
            level,
            page,
            limit,
        },
    });
    return response.data;
};

export const getCourseProgress = async (courseId) => {
    const response = await api.get(`/student/courses/${courseId}/progress`);
    return response.data;
}