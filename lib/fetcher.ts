import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";
interface FetcherConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: any;
}

export const fetcher = async ({
  url,
  method = "GET",
  data,
  params,
  ...config
}: FetcherConfig): Promise<any> => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      params,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.error || error.message || "Unknown error";
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
