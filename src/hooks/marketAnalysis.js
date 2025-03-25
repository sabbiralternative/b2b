import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useMarketAnalysis = () => {
  return useQuery({
    queryKey: ["market-analysis"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.marketAnalysis);
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

export default useMarketAnalysis;
