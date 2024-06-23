import { Alert, Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROLES_LIST } from "../../types/ROLES_LIST";
import useCreateUser from "../../hooks/useCreateUser";

enum AlertType {
  success = "success",
}

type AlertState = {
  type: AlertType;
  message: string;
  visible: boolean;
};

const Register = () => {
  const { createUser, isLoading, isSuccess, isError } = useCreateUser();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);

  const [alert, setAlert] = useState<AlertState | null>(null);

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
      password,
    });
    setAlert({
      message: "User created",
      visible: true,
      type: AlertType.success,
    });
    setName("");
    setEmail("");
    setCountry("");
    setCity("");
    setAddressLine1("");
    setPassword("");
    setRoles([]);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ textAlign: "center" }}>Register</Box>
      <Box>
        <TextField
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
            setAlert(null);
          }}
          label="Name"
          size="small"
          required
          //error={!name}
        />
      </Box>
      <Box mt={1}>
        <TextField
          type="email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
            setAlert(null);
          }}
          label="Email"
          size="small"
          required
          //error={!email}
        />
      </Box>

      <Box mt={1}>
        <TextField
          value={country}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCountry(event.target.value);
            setAlert(null);
          }}
          label="Country"
          size="small"
          required
          //error={!country}
        />
      </Box>
      <Box mt={1}>
        <TextField
          value={city}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCity(event.target.value);
            setAlert(null);
          }}
          label="City"
          size="small"
          required
          //error={!city}
        />
      </Box>
      <Box mt={1}>
        <TextField
          value={addressLine1}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAddressLine1(event.target.value);
            setAlert(null);
          }}
          label="addressLine1"
          size="small"
          required
          //error={!addressLine1}
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setRoles(typeof value === "string" ? value.split(",") : value);
            setAlert(null);
          }}
          required
          //error={!roles.length}
        >
          {Object.values(ROLES_LIST).map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box mt={1}>
        <TextField
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            setAlert(null);
          }}
          label="Password"
          size="small"
          required
          //error={!password}
        />
      </Box>
      <Box mt={1} sx={{ textAlign: "center" }}>
        <Button type="submit" variant="contained" size="small">
          Register
        </Button>
      </Box>

      {alert?.visible && (
        <Box mt={1} sx={{ textAlign: "center" }}>
          <Alert variant="filled" severity={alert?.type}>
            {alert?.message}
          </Alert>
        </Box>
      )}
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
