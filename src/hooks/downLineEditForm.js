import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useDownLineEditForm = (payload) => {
  return useQuery({
    queryKey: ["searchUser"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.downLineEditForm, payload);
      return data;
    },
  });
};
