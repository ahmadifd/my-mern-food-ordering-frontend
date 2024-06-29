import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <Box sx={{ display: "flex", gridRow: "auto" }}>
      <Box sx={{ flexGrow: 1, paddingLeft: "10%" }}>
        <Link to="/">my-mern-frontend</Link>
      </Box>
      <Box sx={{ display: "flex", paddingRight: "10%" }}>
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
