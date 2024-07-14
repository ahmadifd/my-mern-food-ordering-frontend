import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "grid",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ height: "10vh" }}>
        <Header />
      </Box>

      <Box sx={{ padding: "1em", minHeight: "80vh" }}>
        <Outlet />
      </Box>
      <Box sx={{ height: "10vh" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
