import { Box, Grid } from "@mui/material";
import { Order } from "../../types/types";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <Grid mt={1} container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box>
          <Box>
            <Box fontWeight="bold">Delivering to:&nbsp;</Box>

            {order.deliveryDetails.name}
          </Box>
          <Box>
            {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
          </Box>
          <Box mt={1}>
            <Box fontWeight="bold">Your Order:</Box>
            {order.cartItems.map((item,index) => (
              <Box key={index}>
                {item.name} x {item.quantity}
              </Box>
            ))}
          </Box>
          <Box mt={1}>
            <hr />
          </Box>
          <Box mt={1}>
            <Box fontWeight="bold">Total:&nbsp;</Box>

            {order.totalAmount ?? 0}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ textAlign: "center" }}>
          <img
            style={{
              borderRadius: "10px",
              width: "85%",
              height: "30vh",
            }}
            src={order.restaurant?.imageUrl!}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderStatusDetail;
