import { Alert, Box, Button } from "@mui/material";
import CuisinesSection from "./CuisinesSection";
import DetailsSection from "./DetailsSection";
import ImageSection from "./ImageSection";
import MenuSection from "./MenuSection";
import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../context/RestaurantProvider";
import { DetailsType, RestaurantType } from "../../types/Restaurant.types";
import { MenuType } from "../../types/Menu.types";
import { AlertState } from "../../types/Alert.types";
import { useAppDispatch } from "../../app/store";
import {
  createMyRestaurant,
  editMyRestaurant,
} from "../restaurant/myRestaurantSlice";

const ManageRestaurantPage = () => {
  const dispatch = useAppDispatch();
  const {
    details,
    setDetails,
    menuItems,
    setMenuItems,
    cuisines,
    setCuisines,
    restaurant,
    setRestaurant,
  } = useContext(RestaurantContext);

  const [alert, setAlert] = useState<AlertState | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("restaurantName", restaurant!.details!.restaurantName);
    formData.append("city", restaurant!.details!.city);
    formData.append("country", restaurant!.details!.country);
    formData.append(
      "deliveryPrice",
      Number(restaurant!.details!.deliveryPrice).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      (Number(restaurant!.details!.estimatedDeliveryTime)).toString()
    );
    restaurant!.cuisines!.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    restaurant!.menuItems!.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        Number(menuItem.price).toString()
      );
    });

    formData.append(`imageFile`, restaurant!.imageFile!);

    if (restaurant?.isEditing) dispatch(editMyRestaurant(formData));
    else dispatch(createMyRestaurant(formData));
  };

  useEffect(() => {
    const newrestaurant = { ...restaurant };
    newrestaurant.details = { ...details };
    newrestaurant.menuItems = [...menuItems];
    newrestaurant.cuisines = [...cuisines];
    setRestaurant(newrestaurant as RestaurantType);
  }, [details, menuItems, cuisines]);

  const updateDetails = (details: DetailsType) => {
    setDetails(details);
  };

  const updateCuisines = (cuisines: string[]) => {
    setCuisines(cuisines);
  };

  const updateMenu = (menu: MenuType[]) => {
    setMenuItems(menu);
  };

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
      <DetailsSection details={details} updateDetails={updateDetails} />
      <CuisinesSection cuisines={cuisines} updateCuisines={updateCuisines} />
      <MenuSection menuItems={menuItems} updateMenu={updateMenu} />
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