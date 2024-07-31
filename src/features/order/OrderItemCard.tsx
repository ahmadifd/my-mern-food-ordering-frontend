import {
  Badge,
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Order, OrderStatus } from "../../types/types";
import { useUpdateOrderStatusMutation } from "./orderApiSlice";
import { ORDER_STATUS } from "../../config/order-status-config";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);

  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateOrderStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card>
      <CardContent>
        <Box>
          <Box>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: "flex" }}>
                  <Box fontWeight="bold">Customer Name:&nbsp;</Box>
                  <Box>{order.deliveryDetails.name}</Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box sx={{ display: "flex" }}>
                  <Box fontWeight="bold">Delivery address:&nbsp;</Box>
                  <Box>
                    {order.deliveryDetails.addressLine1},
                    {order.deliveryDetails.city}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ display: "flex" }}>
                  <Box fontWeight="bold">Time:&nbsp;</Box>
                  <Box>{getTime()}</Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ display: "flex" }}>
                  <Box fontWeight="bold">Total Cost:&nbsp;</Box>
                  <Box>{order.totalAmount ?? 0}</Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={1} mb={1}>
            <hr />
          </Box>
          <Box>
            {order.cartItems.map((item, index) => (
              <Box key={index} mb={1.5}>
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
            ))}
          </Box>
          <Box mt={2}>
            <TextField
              inputProps={{
                sx: { fontSize: "0.9rem", backgroundColor: "white" },
              }}
              InputLabelProps={{ sx: { fontSize: "0.9rem" } }}
              label="What is the status of this order?"
              select
              fullWidth
              size="small"
              value={status}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                handleStatusChange(value as OrderStatus);
              }}
              //error={!roles.length}
            >
              {ORDER_STATUS.map((item, index) => (
                <MenuItem
                  sx={{ fontSize: "0.9rem" }}
                  key={index}
                  value={item.value}
                >
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
