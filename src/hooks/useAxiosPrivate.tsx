import { axiosPrivate } from "../app/api/axios";
import { useEffect } from "react";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useAppSelector } from "../app/store";
import { useRefreshMutation } from "../features/auth/authApiSlice";

const useAxiosPrivate = () => {
  const token = useAppSelector(selectCurrentToken);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const result = await refresh(null);
          prevRequest.headers["Authorization"] = `Bearer ${result?.data?.data?.accessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
