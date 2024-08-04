import { Box } from "@mui/material";
import { useGetMyOrdersQuery } from "./orderApiSlice";
import OrderStatusHeader from "./OrderStatusHeader";
import OrderStatusDetail from "./OrderStatusDetail";
import { Order } from "../../types/types";

const OrderStatusPage = () => {
  const { data, isLoading } = useGetMyOrdersQuery(
    {},
    { pollingInterval: 5000 }
  );

  console.log(data);

  return (
    <>
      {isLoading ? (
       <h1>...isLoading</h1>
      ) : data?.length ? (
        data?.map((order: Order, index: number) => (
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
        ))
      ) : (
        <Box fontWeight="bold" fontSize="1.3rem">
          No orders
        </Box>
      )}
    </>
  );
};

export default OrderStatusPage;
