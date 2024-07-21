import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getRestaurant, selectRestaurantById } from "./restaurantsSlice";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import RestaurantInfo from "./RestaurantInfo";
import MenuItem from "./MenuItem";
import { MenuType } from "../../types/Menu.types";
import { CartItem } from "../../types/CartItem.types";

const DetailPage = () => {
  const { restaurantId } = useParams();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const dispatch = useAppDispatch();
  const restaurant = useAppSelector((state) =>
    selectRestaurantById(state, restaurantId!)
  );

  const addToCart = (menuItem: MenuType) => {
    // setCartItems((prevCartItems) => {
    //   const existingCartItem = prevCartItems.find(
    //     (cartItem) => cartItem._id === menuItem._id
    //   );
    //   let updatedCartItems;
    //   if (existingCartItem) {
    //     updatedCartItems = prevCartItems.map((cartItem) =>
    //       cartItem._id === menuItem._id
    //         ? { ...cartItem, quantity: cartItem.quantity + 1 }
    //         : cartItem
    //     );
    //   } else {
    //     updatedCartItems = [
    //       ...prevCartItems,
    //       {
    //         _id: menuItem._id,
    //         name: menuItem.name,
    //         price: menuItem.price,
    //         quantity: 1,
    //       },
    //     ];
    //   }
    //   sessionStorage.setItem(
    //     `cartItems-${restaurantId}`,
    //     JSON.stringify(updatedCartItems)
    //   );
    //   return updatedCartItems;
    //});
  };

  console.log(restaurant);
  useEffect(() => {
    dispatch(getRestaurant(restaurantId!));
  }, []);

  return (
    <Box
      sx={{ display: "grid", justifyContent: "center", gridAutoColumns: "95%" }}
    >
      <Box>
        <img
          style={{
            borderRadius: "10px",
            width: "100%",
            height: "40vh",
          }}
          src={restaurant?.imageUrl!}
        />
      </Box>
      <Box mt={1} sx={{ display: "flex" }}>
        <Box sx={{ width: "60%" }}>
          <Box sx={{ width: "100%" }}>
            <RestaurantInfo restaurant={restaurant} />
          </Box>
          <Box>
            <Box
              mt={1}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <Typography fontWeight="bold" fontSize="1.3rem">
                Menu
              </Typography>
              <hr/>
              {restaurant?.menuItems?.map((menuItem, index) => (
                <Box key={index}>
                  <MenuItem
                    menuItem={menuItem}
                    addToCart={() => addToCart(menuItem)}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default DetailPage;
