import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useDownLineEdit = () => {
  return useMutation({
    mutationKey: ["downLineEdit"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.downLineEdit, payload);
      return data;
    },
  });
};

export default useDownLineEdit;
