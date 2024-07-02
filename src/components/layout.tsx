import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "1fr 10fr 1fr",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box sx={{ padding: "1em", minHeight: "100%" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
