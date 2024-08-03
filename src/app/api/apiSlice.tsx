import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setCredentials } from "../../features/auth/authSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, api) => {
    const token = (api.getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(
        setCredentials({
          token: (refreshResult as { data: { data: { accessToken: string } } })
            .data.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        //api.dispatch(logOut())
        refreshResult.error.data = { message: "Your login has expired." };
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 5,
  endpoints: () => ({}),
});
