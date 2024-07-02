import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { cuisineList } from "../../config/cuisineList";
import { useContext } from "react";
import { RestaurantContext } from "../../context/RestaurantProvider";
import { RestaurantType } from "../../types/Restaurant.types";

const CuisinesSection = () => {
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  console.log("CuisinesSection");
  return (
    <Box mt={2}>
      <hr />
      <Box mt={1} sx={{ fontWeight: "bold" }}>
        Cuisines
      </Box>
      <Box sx={{ display: "flex" }}>
        <FormControl>
          <FormGroup row>
            {cuisineList.map((cuisineItem, index) => (
              <FormControlLabel
                sx={{ minWidth: "150px" }}
                key={index}
                control={
                  <Checkbox
                    size="small"
                    checked={restaurant?.cuisines?.includes(cuisineItem)}
                    value={cuisineItem}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const index = restaurant?.cuisines?.indexOf(
                        event.target.value
                      );
                      if (index === -1) {
                        const newrestaurant = { ...restaurant };
                        newrestaurant.cuisines = [
                          ...(restaurant?.cuisines ?? []),
                          event.target.value,
                        ];
                       
                        setRestaurant(newrestaurant as RestaurantType);
                      } else {
                        const newrestaurant = { ...restaurant };
                        newrestaurant.cuisines =
                          newrestaurant?.cuisines?.filter(
                            (cuisine) => cuisine !== event.target.value
                          );
                        setRestaurant(newrestaurant as RestaurantType);
                      }
                    }}
                  />
                }
                label={cuisineItem}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CuisinesSection;
