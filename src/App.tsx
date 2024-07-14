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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route
              path="/login"
              element={
              
                  <Login />
             
              }
            />
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
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
              <Route
                path="/user-profile"
                element={
             
                    <UserProfilePage />
               
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
      </Routes>
    </>
  );
}

export default App;
