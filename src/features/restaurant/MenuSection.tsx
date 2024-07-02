import { Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import { RestaurantContext } from "../../context/RestaurantProvider";
import { RestaurantType } from "../../types/Restaurant.types";
import useMenuArray from "../../hooks/useMenuArray";

const MenuSection = () => {
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  console.log("MenuSection");
  const { setMenu, appendMenu, removeMenu } = useMenuArray(
    restaurant as RestaurantType,
    setRestaurant
  );

  return (
    <Box mt={2}>
      <hr />
      <Box mt={1} sx={{ fontWeight: "bold" }}>
        Menu
      </Box>
      <Box
        mt={1}
        sx={{
          display: "grid",
          justifyContent: "left",
          alignContent: "center",
          rowGap: "0.3em",
        }}
      >
        {restaurant?.menu?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridAutoFlow: "column",
              justifyContent: "center",
            }}
            columnGap={0.5}
          >
            <TextField
              value={item.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMenu(index, { ...item, name: event.target.value });
              }}
              label={`Name`}
              size="small"
              required
            />

            <TextField
              value={item.price}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMenu(index, { ...item, price: event.target.value });
              }}
              label={`Price`}
              size="small"
              required
            />

            <Button
              color="error"
              onClick={() => {
                removeMenu(index);
              }}
              variant="contained"
              size="small"
            >
              Remove
            </Button>
          </Box>
        ))}
      </Box>
      <Box mt={1}>
        <Button
          onClick={() => {
            appendMenu({ name: "", price: "" });
          }}
          variant="contained"
          size="small"
        >
          Add Menu Item
        </Button>
      </Box>
    </Box>
  );
};

export default MenuSection;
