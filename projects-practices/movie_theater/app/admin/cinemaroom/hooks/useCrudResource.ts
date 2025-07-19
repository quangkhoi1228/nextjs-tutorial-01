// import { useState, useCallback } from "react";
// export function useCrudResource<T>(service: {
//   getAll: () => Promise<T[]>;
//   create: (data: Partial<T>) => Promise<any>;
//   update: (id: number, data: Partial<T>) => Promise<any>;
//   delete: (id: number) => Promise<any>;
// }) {
//   const [data, setData] = useState<T[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchAll = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await service.getAll();
//       setData(res);
//       setError(null);
//     } catch (err: any) {
//       setError(err.message || "Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   }, [service]);

//   const createItem = async (item: Partial<T>) => {
//     setLoading(true);
//     try {
//       await service.create(item);
//       await fetchAll();
//     } catch (err: any) {
//       setError(err.message || "Error creating item");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateItem = async (id: number, item: Partial<T>) => {
//     setLoading(true);
//     try {
//       await service.update(id, item);
//       await fetchAll();
//     } catch (err: any) {
//       setError(err.message || "Error updating item");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteItem = async (id: number) => {
//     setLoading(true);
//     try {
//       await service.delete(id);
//       setData((prev) => prev.filter((item) => (item as any).id !== id));
//     } catch (err: any) {
//       setError(err.message || "Error deleting item");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, fetchAll, createItem, updateItem, deleteItem, setData };
// } 