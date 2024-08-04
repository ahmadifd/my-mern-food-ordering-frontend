import { Outlet, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAppSelector } from "../../app/store";
import { selectCurrentToken } from "./authSlice";
import { useEffect, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { Box } from "@mui/material";

const PersistLogin = () => {
  const [localStoragePersisit, setLocalStoragePersisit] =
    useLocalStorage<boolean>("persist", false);

  const token = useAppSelector(selectCurrentToken);
  const navigate = useNavigate();
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
          [401, 403].includes(Number(error.status))
        ) {
          setLocalStoragePersisit(false);
          navigate("/");
        }
      }
    };
    if (!token && localStoragePersisit) 
      {
        verifyRefreshToken();
        console.log("PersistLogin-verifyRefreshToken");
      }
  }, []);

  console.log("Hello PersistLogin", token, localStoragePersisit);

  let content;
  if (!localStoragePersisit) {
    console.log(1);
    content = <Outlet />;
  } else if (isLoading) {
    console.log(2);

    content = <h1>...isLoading</h1>;
  } else if (isError) {
    console.log(3, error);

    if (typeof error === "object") {
      if ("error" in error) content = <Box>{`${error.error}`}</Box>;
      if ("data" in error) content = <Box>{`${error?.data}`}</Box>;
    }
  } else if (isSuccess && trueSuccess) {
    console.log(4);

    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log(5);

    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
