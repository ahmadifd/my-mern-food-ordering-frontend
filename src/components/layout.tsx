import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "1fr 7fr 1fr",
        minHeight:"100vh"
      }}
    >
      <Header />
      <Box sx={{ display: "grid", placeContent: "center" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
