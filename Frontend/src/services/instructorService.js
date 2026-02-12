import api from "../api/axios.js";

export const getInstructorStats = async () => {
    const response = await api.get('/instructor/dashboard');
    return response.data;
};