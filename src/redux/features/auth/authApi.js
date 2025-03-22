import { API } from "../../../api";
import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.login}`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
