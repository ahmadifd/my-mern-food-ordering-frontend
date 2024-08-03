import { useEffect, useState } from "react";
import useEditUser from "../../hooks/useEditUser";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import { ROLES_LIST } from "../../types/ROLES_LIST";
import useGetUser from "../../hooks/useGetUser";
import useAuth from "../../hooks/useAuth";
import { User } from "../../types/User.types";
import { AlertState, AlertType } from "../../types/Alert.types";

const UserProfilePage = () => {
  const { userId: currentuserId, roles: currentUserRoles } = useAuth();
  const { data } = useGetUser(currentuserId, "User1");
  const user = data?.data?.data as User;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const { editUser, isLoading, isSuccess, isError } =
    useEditUser(currentuserId);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user?.email);
      setCountry(user?.country);
      setCity(user?.city);
      setAddressLine1(user?.addressLine1);
      setRoles(user.roles);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editUser({
      _id: currentuserId,
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
      message: "User Updated",
      visible: true,
      type: AlertType.success,
    });
  };

  return (
    <Box>
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
          Edit User
        </Box>
        <Box>
          <TextField
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            fullWidth
            label="Name"
            size="small"
            required
            //error={!name}
          />
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth
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
            fullWidth
            value={country}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCountry(event.target.value);
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
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCity(event.target.value);
            }}
            label="City"
            size="small"
            required
            //error={!city}
          />
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth
            value={addressLine1}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAddressLine1(event.target.value);
            }}
            label="addressLine1"
            size="small"
            required
            //error={!addressLine1}
          />
        </Box>
        <Box mt={1}>
          <TextField
            inputProps={{ sx: { backgroundColor: "white" } }}
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
            }}
            required
            //error={!roles.length}
          >
            {Object.values(ROLES_LIST)
              .filter((x) =>
                currentUserRoles.includes(ROLES_LIST.Admin)
                  ? x
                  : x !== ROLES_LIST.Admin
              )
              .map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
          </TextField>
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth
            type="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            label="Password"
            size="small"
          />
        </Box>
        <Box mt={1} sx={{ textAlign: "center" }}>
          <Button type="submit" variant="contained" size="small">
            Update
          </Button>
        </Box>

        {alert?.visible && (
          <Snackbar
            open={alert?.visible}
            autoHideDuration={3000}
            onClose={() => {
              setAlert(null);
            }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert variant="filled" severity={alert?.type}>
              {alert?.message}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default UserProfilePage;
