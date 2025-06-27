import axiosInstance from './axiosConfig';

export const getAllActors = async () => {
  const res = await axiosInstance.get('/actor');
  return res.data;
}; 