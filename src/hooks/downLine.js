import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useDownLine = () => {
  return useMutation({
    mutationKey: ["downLineData"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.downline, payload);
      return data?.result;
    },
  });
};

export default useDownLine;
