import axiosInstance from "../movie/services/axiosConfig";

export class BaseService<T> {
  constructor(private baseUrl: string) {
    console.log("✅ BaseService khởi tạo với baseUrl:", baseUrl);

  }

  async getAll(): Promise<T[]> {
    const res = await axiosInstance.get(this.baseUrl); // ✅ sửa
    return res.data;
  }

  async getById(id: number): Promise<T> {
    const res = await axiosInstance.get(`${this.baseUrl}/${id}`);
    return res.data;
  }

  async create(data: Partial<T>): Promise<T> {
    const res = await axiosInstance.post(this.baseUrl, data);
    return res.data;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const res = await axiosInstance.put(`${this.baseUrl}/${id}`, data);
    return res.data;
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`${this.baseUrl}/${id}`);
  }

  async softDelete(id: number): Promise<T> {
    const res = await axiosInstance.patch(`${this.baseUrl}/${id}/soft-delete`);
    return res.data;
  }
}
