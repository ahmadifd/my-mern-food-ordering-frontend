import { Box } from "@mui/material";
import { useGetMyOrdersQuery } from "./orderApiSlice";
import OrderStatusHeader from "./OrderStatusHeader";
import OrderStatusDetail from "./OrderStatusDetail";
import { Order } from "../../types/types";

const OrderStatusPage = () => {
  const myOrders = useGetMyOrdersQuery({}, { pollingInterval: 5000 });

  console.log(myOrders);

  return myOrders?.data?.map((order: Order, index: number) => (
    <Box
      key={index}
      mb={5}
      sx={{
        backgroundColor: "grey.100",
        padding: "1em",
        borderRadius: "0.5em",
      }}
    >
      <OrderStatusHeader order={order} />
      <OrderStatusDetail order={order} />
    </Box>
  ));
};

export default OrderStatusPage;
