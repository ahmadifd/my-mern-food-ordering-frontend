import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };
  return (
    <Box  component="form" onSubmit={handleSubmit}>
      <Box sx={{ textAlign: "center" }}>Login</Box>
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
      <TextField type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            console.log(password);
          }}
          label="Password"
          size="small"
          required
          //error={!password}
        />
      </Box>
      <Box mt={1} sx={{ textAlign: "center" }}>
        <Button type="submit" variant="contained" size="small">
          Sign In
        </Button>
      </Box>
      <Box>
        <Link to="/"> Back to Home</Link>
      </Box>
      <Box>
        <Link to="/register">Sign Up</Link>
      </Box>
    </Box>
  );
};

export default Login;
