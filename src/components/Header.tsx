import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1, paddingLeft: "10%" }}>
        <Link to="/">MernEats.com</Link>
      </Box>
      <Box  sx={{ display: "flex", paddingRight: "10%" }}>
        <Box sx={{ display: { md: "none" } }}>
          <MobileNav />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          <MainNav />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
