import api from "../api/axios.js";

export const enrollBatch = async (batchId) => {
  const response = await api.post(`/student/batches/${batchId}/enroll`);
  return response.data;
};

export const getMyBatches = async () => {
  const response = await api.get("/student/enrollments");
  return response.data;
};

export const getMyBatch = async () => {
  const data = await getMyBatches();
  return Array.isArray(data) ? data : [];
};

export const getAllBatches = async () => {
  const response = await api.get("/batches");
  return response.data?.batches || [];
};

export const getPublicBatches = async (params = {}) => {
  const response = await api.get("/batches", { params });
  return response.data;
};
