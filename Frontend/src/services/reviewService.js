import api from "../api/axios.js";

export const getCourseReviews = async (courseId) => {
    const response = await api.get(`/courses/${courseId}/reviews`);
    return response.data;
};

export const getCourseRatingSummary = async (courseId) => {
    const response = await api.get(`/courses/${courseId}/ratings`);
    return response.data;
};

export const submitReview = async (courseId, data) => {
    const response = await api.post(`/courses/${courseId}/reviews`, data);
    return response.data;
};
