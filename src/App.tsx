import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import UserProfilePage from "./features/user/UserProfilePage";
import Login from "./features/auth/Login";
import Register from "./features/user/Register";
import PersistLogin from "./features/auth/PersistLogin";
import Home from "./components/HomePage";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES_LIST } from "./types/ROLES_LIST";
import ManageRestaurantPage from "./features/restaurant/ManageRestaurantPage";
import RestaurantOrdersPage from "./features/order/RestaurantOrdersPage";
import RestaurantProvider from "./context/RestaurantProvider";
import SearchPage from "./features/search/SearchPage";
import { QueryClient, QueryClientProvider } from "react-query";
import DetailPage from "./features/search/DetailPage";
import PayPage from "./features/order/PayPage";
import OrderStatusPage from "./features/order/OrderStatusPage";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route path="/login" element={<Login />} />
            <Route index element={<Home />} />
            <Route path="search/:city" element={<SearchPage />} />
            <Route
              path="/register"
              element={
                <QueryClientProvider client={queryClient}>
                  <Register />
                </QueryClientProvider>
              }
            />
            <Route
              element={
                <RequireAuth
                  allowedRoles={[
                    ROLES_LIST.Admin,
                    ROLES_LIST.Owner,
                    ROLES_LIST.User,
                  ]}
                />
              }
            >
              <Route path="/order-status" element={<OrderStatusPage />} />
              <Route
                path="/detail/:restaurantId"
                element={
                  <QueryClientProvider client={queryClient}>
                    <DetailPage />
                  </QueryClientProvider>
                }
              />
              <Route
                path="/user-profile"
                element={
                  <QueryClientProvider client={queryClient}>
                    <UserProfilePage />
                  </QueryClientProvider>
                }
              />

              <Route
                path="/manage-restaurant"
                element={
                  <RestaurantProvider>
                    <ManageRestaurantPage />
                  </RestaurantProvider>
                }
              />

              <Route
                path="/restaurant-orders"
                element={<RestaurantOrdersPage />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="/pay-page/:orderId" element={<PayPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
