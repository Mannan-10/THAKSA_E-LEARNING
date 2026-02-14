import api from "../api/axios.js";

export const submitContactMessage = async (data) => {
  const response = await api.post("/contact", data);
  return response.data;
};
