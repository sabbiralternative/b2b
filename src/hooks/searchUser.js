import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useSearchUser = () => {
  return useMutation({
    mutationKey: ["searchUser"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.searchUser, payload);
      return data;
    },
  });
};
