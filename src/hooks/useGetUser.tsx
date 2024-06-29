import axios from "../app/api/axios";
import { useQuery } from "react-query";

export const useGetUser = (email: string, cachName: string) => {
  const GET_USER_URL = `/user/getUser/${email}`;
  const getUserRequest = async () => {
    try {
      const response = await axios.get(GET_USER_URL, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, isError, isSuccess } = useQuery(
    cachName,
    getUserRequest
  );

  return { data, isLoading, isError, isSuccess };
};

export default useGetUser;
