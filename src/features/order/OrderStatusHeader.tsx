import {
  Box,
  Grid,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import { ORDER_STATUS } from "../../config/order-status-config";
import { Order } from "../../types/types";
import { styled } from "@mui/material/styles";

type Props = {
  order: Order;
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box sx={{ fontSize: "1.3rem", fontWeight: "bold", textAlign: "left" }}>
          Order Status: {getOrderStatusInfo().label}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            fontSize: "1.3rem",
            fontWeight: "bold",
            textAlign: { md: "right" },
          }}
        >
          Expected by:{getExpectedDelivery()}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <BorderLinearProgress
          variant="determinate"
          value={getOrderStatusInfo().progressValue}
        />
      </Grid>
    </Grid>
  );
};

export default OrderStatusHeader;
