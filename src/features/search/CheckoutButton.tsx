import { Box, Button, colors, Modal } from "@mui/material";
import { useState } from "react";
import UserProfileForm from "../user/UserProfileForm";
import useAuth from "../../hooks/useAuth";
import { useGetUser } from "../../hooks/useGetUser";
import { User } from "../../types/User.types";
import { UserFormData } from "../../types/UserFormData.types";

type Props = {
  onCheckout: (userProfileData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const style = {
  position: "absolute" as "absolute",
  top: "10%",
  left: "20%",
  right: "20%",
  //  transform: "translate(-50%, -50%)",
  bgcolor: colors.grey[50], //"white",
  boxShadow: 24,
  pt: 2,
  px: 3,
  pb: 2,
  borderRadius: 1,
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const { userId: currentuserId } = useAuth();
  const { data, isLoading: isGetUserLoading } = useGetUser(
    currentuserId,
    "User1"
  );
  const user = data?.data?.data as User;

  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <Box sx={{ display: "grid", justifyContent: "center" }}>
        <Box>
          <Button
            disabled={disabled}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Go to checkout
          </Button>
        </Box>
      </Box>
      <Modal open={showModal}>
        <Box sx={{ ...style }}>
          <Box>
            <UserProfileForm
              currentUser={user}
              onSave={onCheckout}
              isLoading={isGetUserLoading}
              title="Confirm Deliery Details"
              buttonText="Continue to payment"
            />
          </Box>
          <Box sx={{ display: "grid", justifyContent: "center" }}>
            <Button
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CheckoutButton;
