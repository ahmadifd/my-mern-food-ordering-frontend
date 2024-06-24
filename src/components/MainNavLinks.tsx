import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogOutMutation } from "../features/auth/authApiSlice";

type Props = {
  email: string;
};

const MainNavLinks = ({ email }: Props) => {
  const [logOut] = useLogOutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    setAnchorEl(null);
    await logOut(null);
    navigate("/");
  };

  return (
    <Box>
      <Button
        sx={{ textTransform: "none" }}
        color="inherit"
        id="resources-button"
        onClick={handleClick}
      >
        {email}
      </Button>
      <Menu
        id="resources-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Manage Restaurant</MenuItem>
        <MenuItem onClick={handleClose}>User Profile</MenuItem>
        <MenuItem onClick={signOut}>Log Out</MenuItem>
      </Menu>
    </Box>
  );
};
export default MainNavLinks;
