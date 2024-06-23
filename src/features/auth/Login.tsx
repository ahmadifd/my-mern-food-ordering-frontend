import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>Login</Box>
      <Box>
        <TextField label="Email" size="small" />
      </Box>
      <Box mt={1}>
        <TextField label="Password" size="small" />
      </Box>
      <Box mt={1} sx={{ textAlign: "center" }}>
        <Button variant="contained" size="small">
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
