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
        console.log(arg);
        return {
          url: "/order/checkout/webhook",
          method: "POST",
          body: { ...arg },
        };
      },
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useStripeWebhookHandlerMutation,
} = orderApiSlice;
