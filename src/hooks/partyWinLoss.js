import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const usePartyWinLoss = () => {
  return useMutation({
    mutationKey: ["party-win-loss"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.partyWinLoss, payload);
      return data;
    },
  });
};
