import { User } from "../types/User.types";
import { useMutation } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useEditUser = (id: string) => {
  const axiosPrivate = useAxiosPrivate();
  const EDIT_USER_URL = `/my/user/editUser/${id}`;
  const editUserRequest = async (user: User) => {
    try {
      await axiosPrivate.patch(EDIT_USER_URL, JSON.stringify(user), {
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
