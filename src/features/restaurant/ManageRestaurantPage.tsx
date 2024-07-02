import { Alert, Box, Button } from "@mui/material";
import CuisinesSection from "./CuisinesSection";
import DetailsSection from "./DetailsSection";
import ImageSection from "./ImageSection";
import MenuSection from "./MenuSection";
import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../context/RestaurantProvider";
import {
  DetailType,
  DetailsType,
  RestaurantType,
} from "../../types/Restaurant.types";
enum AlertType {
  success = "success",
}

type AlertState = {
  type: AlertType;
  message: string;
  visible: boolean;
};
const ManageRestaurantPage = () => {
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  const [details, setDetails] = useState<DetailsType>(restaurant?.details!);
  console.log("ManageRestaurantPage");

  const [alert, setAlert] = useState<AlertState | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const newrestaurant = { ...restaurant };
    newrestaurant.details = details;
    setRestaurant(newrestaurant as RestaurantType);
  }, [details]);

  console.log(restaurant);

  return (
    <Box
      component="form"
      sx={{
        backgroundColor: "grey.100",
        padding: "1em",
        borderRadius: "0.5em",
      }}
      onSubmit={handleSubmit}
    >
      <DetailsSection details={details} setDetails={setDetails} />
      <CuisinesSection />
      <MenuSection />
      <ImageSection />

      <Box mt={1} sx={{ textAlign: "center" }}>
        <Button type="submit" variant="contained">
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
    </Box>
  );
};

export default ManageRestaurantPage;
