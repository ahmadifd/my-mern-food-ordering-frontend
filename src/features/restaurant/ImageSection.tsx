import { Box, TextField } from "@mui/material";
import { useContext } from "react";
import { RestaurantContext } from "../../context/RestaurantProvider";
import { RestaurantType } from "../../types/Restaurant.types";

const ImageSection = () => {
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  //console.log("ImageSection",restaurant?.file);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const extname = e.target.files[0].name.slice(
        e.target.files[0].name.lastIndexOf(".") + 1
      );
      if (["jpeg", "jpg", "png"].includes(extname)) {
        console.log(e.target.files[0]);
        const newrestaurant = { ...restaurant };
        newrestaurant.imageFile = e.target.files[0];
        setRestaurant(newrestaurant as RestaurantType);
      } else e.target.value = "";
    }
  };

  return (
    <Box>
      <Box mt={2}>
        <hr />
        <Box mt={1} sx={{ fontWeight: "bold" }}>
          Image
        </Box>
        {restaurant?.imageUrl && (
          <Box mt={2}>
            <img
              style={{ minWidth: "50%", maxWidth: "100%", height: "50vh" }}
              src={restaurant?.imageUrl!}
            />
          </Box>
        )}

        <Box mt={1}>
          <TextField
            type="file"
            size="small"
            onChange={handleFileChange}
            inputProps={{ accept: "image/jpeg,image/jpg,image/png" }}
            required={!restaurant?.isEditing}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ImageSection;
