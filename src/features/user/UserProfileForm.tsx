import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { UserFormData } from "../../types/UserFormData.types";

type Props = {
  currentUser: UserFormData;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const UserProfileForm = ({
  onSave,
  currentUser,
  isLoading,
  title = "User Profile",
  buttonText = "Submit",
}: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.name);
      setEmail(currentUser?.email);
      setCountry(currentUser?.country);
      setCity(currentUser?.city);
      setAddressLine1(currentUser?.addressLine1);
    }
  }, [currentUser]);

  return (
    <Box
      component="form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave({
          name,
          email,
          country,
          city,
          addressLine1,
        });
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1em",
        }}
      >
        {title}
      </Box>
      <Box>
        <TextField
          fullWidth
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
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
          fullWidth
          value={city}
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

      <Box mt={1} sx={{ textAlign: "center" }}>
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          size="small"
        >
          {buttonText}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UserProfileForm;
