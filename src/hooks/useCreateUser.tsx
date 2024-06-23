import { User } from "../types/User.types";
import axios from "../app/api/axios";
import { useMutation } from "react-query";

const REGISTER_URL = "/user/register";

export const useCreateUser = () => {
  const createUserRequest = async (user: User) => {
    try {
      await axios.post(REGISTER_URL, JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);

  return { createUser, isLoading, isError, isSuccess };
};

export default useCreateUser;
