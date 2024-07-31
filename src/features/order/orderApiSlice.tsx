import { apiSlice } from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (arg) => {
        console.log(arg);
        return {
          url: "/order/checkout/create-checkout-session",
          method: "POST",
          body: { ...arg },
        };
      },
    }),
    stripeWebhookHandler: builder.mutation({
      query: (arg) => {
        return {
          url: "/order/checkout/webhook",
          method: "POST",
          body: { ...arg },
        };
      },
    }),
    getMyOrders: builder.query({
      query: () => `/order/getMyOrders`,
    }),
    getRestaurantOrders: builder.query({
      query: () => `/my/restaurant/order`,
    }),
    updateOrderStatus: builder.mutation({
      query: (arg) => {
        console.log(arg);
        return {
          url: `/my/restaurant/order/${arg.orderId}/status`,
          method: "PUT",
          body: JSON.stringify({ status: arg.status }),
        };
      },
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useStripeWebhookHandlerMutation,
  useGetMyOrdersQuery,
  useGetRestaurantOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApiSlice;
