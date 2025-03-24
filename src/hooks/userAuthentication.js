import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useUserAuthentication = (payload) => {
  return useQuery({
    queryKey: ["user-authentication"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.userAuthentication, payload);
      return data;
    },
  });
};
