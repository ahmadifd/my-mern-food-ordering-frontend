import { Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROLES_LIST } from "../../types/ROLES_LIST";
import useCreateUser from "../../hooks/useCreateUser";

const Register = () => {
  const { createUser, isLoading, isSuccess, isError } = useCreateUser();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [roles, setRoles] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRoles(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser({
      name,
      email,
      roles,
      active: true,
      addressLine1,
      city,
      country,
      password
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ textAlign: "center" }}>Register</Box>
      <Box>
        <TextField
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
          label="Name"
          size="small"
        />
      </Box>
      <Box mt={1}>
        <TextField
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          label="Email"
          size="small"
        />
      </Box>

      <Box mt={1}>
        <TextField
          value={country}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCountry(event.target.value);
          }}
          label="Country"
          size="small"
        />
      </Box>
      <Box mt={1}>
        <TextField
          value={city}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCity(event.target.value);
          }}
          label="City"
          size="small"
        />
      </Box>
      <Box mt={1}>
        <TextField
          value={addressLine1}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAddressLine1(event.target.value);
          }}
          label="addressLine1"
          size="small"
        />
      </Box>
      <Box mt={1}>
        <TextField
          label="Select Type"
          select
          SelectProps={{
            multiple: true,
          }}
          fullWidth
          size="small"
          helperText="Please select your Type"
          value={roles}
          onChange={handleChange}
        >
          {Object.values(ROLES_LIST).map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
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
        />
      </Box>
      <Box mt={1} sx={{ textAlign: "center" }}>
        <Button type="submit" variant="contained" size="small">
          Register
        </Button>
      </Box>
      <Box>
        <Link to="/"> Back to Home</Link>
      </Box>
      <Box>
        <Link to="/login">Login</Link>
      </Box>
    </Box>
  );
};

export default Register;
