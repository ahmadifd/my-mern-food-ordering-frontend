import { useQuery } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useGetUser = (
  userId: string,
  cacheName: string
) => {
  const axiosPrivate = useAxiosPrivate();
  const GET_USER_URL = `/my/user/getUser/${userId}`;
  const getUserRequest = async () => {
    try {
      const response = await axiosPrivate.get(GET_USER_URL, {});
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, isError, isSuccess } = useQuery(
    cacheName,
    getUserRequest
  );

  return { data, isLoading, isError, isSuccess };
};

export default useGetUser;
