import axiosInstance from './axiosConfig';

export const getAllGernes = async () => {
  const res = await axiosInstance.get('/gernes');
  return res.data;
}; 