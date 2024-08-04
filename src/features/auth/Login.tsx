import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LoadingButton } from '@mui/lab';

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [login , {isLoading}] = useLoginMutation();
  const [persist, setPersist] = useState<boolean>(false);
  const [_localStoragePersisit, setLocalStoragePersisit] =
    useLocalStorage<boolean>("persist", false);

  useEffect(() => {}, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({
        email,
        password,
      }).unwrap();
      setLocalStoragePersisit(persist);
      console.log("Login-handleSubmit");
      navigate(from, { replace: true });
    } catch (error) {}
  };

  return (
    <Box sx={{ display: "grid", placeContent: "center" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "grey.100",
          padding: "1em",
          borderRadius: "0.5em",
        }}
      >
        <Box
          sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "1em" }}
        >
          Login
        </Box>
        <Box>
          <TextField
            type="email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            label="Email"
            size="small"
            required

            //error={!email}
          />
        </Box>
        <Box mt={1}>
          <TextField
            type="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            label="Password"
            size="small"
            required
            //error={!password}
          />
        </Box>
        <Box mt={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={persist}
                onChange={() => setPersist((prev: boolean) => !prev)}
                size="small"
              />
            }
            label="Trust This Device"
          />
        </Box>
        <Box mt={1} sx={{ textAlign: "center" }}>
          <LoadingButton loading={isLoading} type="submit" variant="contained"  loadingPosition='center'  >
            Sign In
          </LoadingButton>
        </Box>
        <Box>
          <Link to="/"> Back to Home</Link>
        </Box>
        <Box>
          <Link to="/register">Sign Up</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
