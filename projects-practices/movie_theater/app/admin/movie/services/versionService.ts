import axiosInstance from './axiosConfig';

export const getAllVersions = async () => {
  const res = await axiosInstance.get('/versions');
  return res.data;
}; 