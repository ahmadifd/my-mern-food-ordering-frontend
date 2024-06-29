import { Outlet } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAppSelector } from "../../app/store";
import { selectCurrentToken } from "./authSlice";
import { useEffect, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { Box } from "@mui/material";

const PersistLogin = () => {

  const [persist, setPersist] = useLocalStorage("persist", false);
  const token = useAppSelector(selectCurrentToken);

  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh(null).unwrap();
        setTrueSuccess(true);
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "status" in error &&
          error.status === 401
        ) {
          setPersist(false);
          window.location.replace("/");
        }
      }
    };

    if (!token && persist) verifyRefreshToken();
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <h1>...isLoading</h1>;
  } else if (isError) {
    if (typeof error === "object" && "error" in error) {
      content = <Box>{`${error.error}`}</Box>;
    }
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
