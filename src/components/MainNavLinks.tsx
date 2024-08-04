import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useLogOutMutation } from "../features/auth/authApiSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

type Props = {
  email: string;
  isOwner: boolean;
  isUser: boolean;
};

const MainNavLinks = ({ email, isOwner, isUser }: Props) => {
  const [_localStoragePersisit, setLocalStoragePersisit] =
    useLocalStorage<boolean>("persist", false);
  const [logOut, { isLoading }] = useLogOutMutation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    setLocalStoragePersisit(false);

    await logOut(null);

    setAnchorEl(null);
    navigate("/");
    //window.location.replace("/");
  };

  return (
    <Box>
      <Button
        sx={{ textTransform: "none", fontWeight: "bold" }}
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
        {isUser && (
          <MenuItem
            onClick={() => {
              navigate("/order-status");
              setAnchorEl(null);
            }}
          >
            Order Status
          </MenuItem>
        )}
        {isOwner && (
          <MenuItem
            onClick={() => {
              navigate("/manage-restaurant");
              setAnchorEl(null);
            }}
          >
            Manage Restaurant
          </MenuItem>
        )}
        {isOwner && (
          <MenuItem
            onClick={() => {
              navigate("/restaurant-orders");
              setAnchorEl(null);
            }}
          >
            Orders
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            navigate("/user-profile");
            setAnchorEl(null);
          }}
        >
          User Profile
        </MenuItem>
        <MenuItem onClick={signOut}>
          {isLoading ? "... Logging Out" : " Log Out"}
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default MainNavLinks;
