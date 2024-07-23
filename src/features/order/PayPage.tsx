import { Box, Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useStripeWebhookHandlerMutation } from "./orderApiSlice";

const PayPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const totalPrice = searchParams.get("totalPrice");
  const [stripeWebhookHandler, { isLoading }] =
    useStripeWebhookHandlerMutation();
  return (
    <Box sx={{ height: "100vh", display: "grid", placeContent: "center" }}>
      <Button
        onClick={() => {
          stripeWebhookHandler({ orderId, totalPrice });
          navigate("/");
        }}
        variant="contained"
      >
        {orderId} - PAY - {totalPrice}
      </Button>
    </Box>
  );
};

export default PayPage;
