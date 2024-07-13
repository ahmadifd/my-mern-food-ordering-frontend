import { Box, TextField } from "@mui/material";
import { useContext } from "react";
import { RestaurantContext } from "../../context/RestaurantProvider";
import { RestaurantType } from "../../types/Restaurant.types";

const ImageSection = () => {
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  //console.log("ImageSection",restaurant?.file);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newrestaurant = { ...restaurant };
      newrestaurant.imageFile = e.target.files[0];
      setRestaurant(newrestaurant as RestaurantType);
    }
  };

  return (
    <Box>
      <Box  mt={2}>
        <hr />
        <Box mt={1} sx={{ fontWeight: "bold" }}>
          Image
        </Box>
        <Box mt={1}>
          <TextField type="file" size="small" onChange={handleFileChange} />
        </Box>
      </Box>
      <Box  mt={2}>
        <img style={{minWidth:'50%' , maxWidth:"100%" , height:"50vh"}} src={restaurant?.imageUrl!} />
      </Box>
    </Box>
  );
};

export default ImageSection;
