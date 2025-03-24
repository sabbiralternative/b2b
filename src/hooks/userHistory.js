import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useUserHistory = (payload) => {
  return useMutation({
    mutationKey: ["user-history"],
    mutationFn: async () => {
      const { data } = await AxiosSecure.post(API.userHistory, payload);
      return data;
    },
  });
};
