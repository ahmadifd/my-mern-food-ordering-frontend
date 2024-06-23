import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import UserProfilePage from "./features/user/UserProfilePage";
import Login from "./features/auth/Login";
import Register from "./features/user/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
