import api from '../api/axios.js';

export const getMyBatch = async () => {
    const res = await api.get('/student/my-batch');
    return res.data;
}

export const getMyBatches = async () => {
    const res = await api.get('/student/batches');
    return res.data;
}

export const getAllBatches = async () => {
    const res = await api.get('/batches');
    return res.data;
}

export const enrollBatch = async (batchId) => {
    const res = await api.post(`/student/batches/${batchId}/enroll`);
    return res.data;
}

export const getMyEnrollments = async () => {
    const res = await api.get('/student/enrollments');
    return res.data;
}
