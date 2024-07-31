import { Alert, Box, Snackbar } from "@mui/material";
import { useGetRestaurantOrdersQuery } from "./orderApiSlice";
import OrderItemCard from "./OrderItemCard";
import { Order } from "../../types/types";
import { AlertState, AlertType } from "../../types/Alert.types";
import { useState } from "react";

const RestaurantOrdersPage = () => {
  const [alert, setAlert] = useState<AlertState | null>(null);
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
            <Box mb={3} key={index}>
              <OrderItemCard
                order={order}
                showAlert={(message: string, type: AlertType) => {
                  setAlert({
                    message: message,
                    visible: true,
                    type: type,
                  });
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        {alert?.visible && (
          <Snackbar
            open={alert?.visible}
            autoHideDuration={6000}
            onClose={() => {
              setAlert(null);
            }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert variant="filled" severity={alert?.type}>
              {alert.message}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default RestaurantOrdersPage;
