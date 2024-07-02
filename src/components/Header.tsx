import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        fontWeight: "bold",
        justifyContent: "space-between",
        backgroundColor: "grey.500",
        alignItems: "center",
      }}
      fontSize={14}
    >
      <Box sx={{ marginLeft: "5%" }}>
        <Link to="/">my-mern-frontend</Link>
      </Box>
      <Box sx={{ marginRight: "5%" }}>
        {/* <Box sx={{ display: { md: "none" } }}>
        <MainNav />
        </Box> */}
        {/* <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}> */}
        <MainNav />
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default Header;
