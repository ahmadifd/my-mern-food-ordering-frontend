import { Box } from "@mui/material";
import { useGetRestaurantOrdersQuery } from "./orderApiSlice";
import OrderItemCard from "./OrderItemCard";
import { Order } from "../../types/types";

const RestaurantOrdersPage = () => {
  const myOrdes = useGetRestaurantOrdersQuery(null);

  console.log(myOrdes);
  return (
    <Box
      sx={{
        backgroundColor: "grey.100",
        padding: "1em",
        borderRadius: "0.5em",
        minHeight: "100%",
      }}
    >
      <Box>
        <Box fontWeight="bold" fontSize="1.3rem">
          {myOrdes?.data?.length}&nbsp;active orders
        </Box>
        <Box mt={2}>
          {myOrdes?.data?.map((order: Order, index: number) => (
            <Box  mb={3} key={index}>
              <OrderItemCard order={order} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RestaurantOrdersPage;
