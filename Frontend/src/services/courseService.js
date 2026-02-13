import api from "../api/axios.js";

export const getCourseContent = async (courseId) => {
    const res = await api.get(`/courses/${courseId}/content`);
    return res.data;
}

export const markComplete = async (lessonId) => {
    const res = await api.post(`/courses/lessons/${lessonId}/complete`);
    return res.data;
}