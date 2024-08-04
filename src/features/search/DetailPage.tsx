import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getRestaurant, selectRestaurantById } from "./restaurantsSlice";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import RestaurantInfo from "./RestaurantInfo";
import MenuItem from "./MenuItem";
import { MenuItem as MenuItemType } from "../../types/MenuItem.types";
import { CartItem } from "../../types/CartItem.types";
import OrderSummary from "../order/OrderSummary";
import CheckoutButton from "./CheckoutButton";
import { UserFormData } from "../../types/UserFormData.types";
import { useCreateCheckoutSessionMutation } from "../order/orderApiSlice";

const DetailPage = () => {
  const { restaurantId } = useParams();
  const [createCheckoutSession , {isLoading}] =
    useCreateCheckoutSessionMutation();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const dispatch = useAppDispatch();
  const restaurant = useAppSelector((state) =>
    selectRestaurantById(state, restaurantId!)
  );

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem: CartItem) => cartItem._id === menuItem._id
      );
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: parseFloat(menuItem.price),
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  useEffect(() => {
    dispatch(getRestaurant(restaurantId!));
  }, []);

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    //console.log(checkoutData);

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.data.url;
  };

  return (
    <Box
      sx={{
        backgroundColor: "grey.100",
        padding: "1em",
        borderRadius: "0.5em",
        display: "grid",
        justifyContent: "center",
        gridAutoColumns: "95%",
      }}
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
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box>
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
                  <hr />
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
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Card>
                <CardContent>
                  <OrderSummary
                    restaurant={restaurant}
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                  />
                </CardContent>
                <CardContent>
                  <CheckoutButton
                    isLoading={isLoading}
                    onCheckout={onCheckout}
                    disabled={cartItems.length === 0}
                  />
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DetailPage;
