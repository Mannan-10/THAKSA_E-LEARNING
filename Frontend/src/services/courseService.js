import api from "../api/axios.js";

export const getCourseContent = async (courseId) => {
  const response = await api.get(`/courses/${courseId}/content`);
  return response.data;
};

export const markComplete = async (lessonId) => {
  const response = await api.post(`/courses/lessons/${lessonId}/complete`);
  return response.data;
};

export const getCourseProgress = async (courseId) => {
  const response = await api.get(`/student/courses/${courseId}/progress`);
  return response.data;
};
