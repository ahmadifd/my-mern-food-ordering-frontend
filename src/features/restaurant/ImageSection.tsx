import { Box, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { RestaurantContext } from "../../context/RestaurantProvider";
import { RestaurantType } from "../../types/Restaurant.types";

const ImageSection = () => {
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  console.log("ImageSection");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newrestaurant = { ...restaurant };
      newrestaurant.file = e.target.files[0];
      setRestaurant(newrestaurant as RestaurantType);
    }
  };

  return (
    <Box mt={2}>
      <hr />
      <Box mt={1} sx={{ fontWeight: "bold" }}>
        Image
      </Box>
      <Box mt={1}>
        <TextField type="file" size="small" onChange={handleFileChange} />
      </Box>
    </Box>
  );
};

export default ImageSection;
