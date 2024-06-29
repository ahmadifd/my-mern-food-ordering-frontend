import { User } from "../types/User.types";
import axios from "../app/api/axios";
import { useMutation } from "react-query";

export const useEditUser = (id: string) => {
  const EDIT_USER_URL = `/user/editUser/${id}`;
  const editUserRequest = async (user: User) => {
    try {
      await axios.patch(EDIT_USER_URL, JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const {
    mutateAsync: editUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(editUserRequest);

  return { editUser, isLoading, isError, isSuccess };
};

export default useEditUser;
