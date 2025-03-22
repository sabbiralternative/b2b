import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useAccountStatement = () => {
  return useMutation({
    mutationKey: ["account-statement"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.accountStatement, payload);
      return data?.result;
    },
  });
};
