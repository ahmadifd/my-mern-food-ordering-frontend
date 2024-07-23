import { Badge, Box, IconButton, TextField, Typography } from "@mui/material";
import { CartItem } from "../../types/CartItem.types";
import { RestaurantType } from "../../types/Restaurant.types";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type Props = {
  restaurant: RestaurantType;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalPrice = cartItems?.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    let totalWithDelivery = totalPrice;
    if (restaurant?.details?.deliveryPrice) {
      totalWithDelivery += parseFloat(restaurant?.details?.deliveryPrice!);
    }
    return totalWithDelivery;
  };


  return (
    <Box sx={{ display: "grid" }} rowGap={1}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography fontWeight="bold">Your Order</Typography>
        </Box>
        <Box>{getTotalCost()}</Box>
      </Box>
      <Box>
        {cartItems.map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Badge
                color="secondary"
                badgeContent={item.quantity}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }} 
              >
                {item.name}
              </Badge>
            </Box>
            <Box>
              <IconButton
                color="success"
                size="small"
                onClick={() => removeFromCart(item)}
              >
                <DeleteOutlineIcon />
              </IconButton>
              {item.price * item.quantity}
            </Box>
          </Box>
        ))}
      </Box>
      <Box>
        <hr />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>Delivery</Box>
        <Box>{restaurant?.details?.deliveryPrice}</Box>
      </Box>
      <Box>
        <hr />
      </Box>
    </Box>
  );
};

export default OrderSummary;
