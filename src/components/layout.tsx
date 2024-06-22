import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Box sx={{ display: "grid", gridTemplateRows: "repeat(3,1fr)" }}>
      <Header />
      <Box>
        <Outlet />
        Main
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
