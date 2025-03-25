import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useCurrentBets = () => {
  return useMutation({
    mutationKey: ["current-bets"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.currentBets, payload);
      return data;
    },
  });
};
