import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const useApi = (url: string, message: string) => {
  const [data, setData] = useState<AxiosResponse>();
  useEffect(() => {
    async function fetchApi(url: string) {
      try {
        // template literal
        setTimeout(() => {
          toast.info(`Start fetch data ${message}`);
        }, 100);

        const res: AxiosResponse = await axios.get(url);
        setData(res.data);
        setTimeout(() => {
          toast.success(`Fetch data success ${message}`);
        }, 2000);
      } catch (error: unknown) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(`Fetch data failed ${message}`, {
          description: axiosError.response?.data.message,
          duration: 3000,
        });
      }
    }

    fetchApi(url);
  }, [message, url]);

  return { data };
};

export default useApi;
