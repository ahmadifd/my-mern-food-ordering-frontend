import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ display: "flex", gridRow: "" }}>
      <Box sx={{ flexGrow: 1, paddingLeft: "10%" }}>
        my-mern-food-ordering-frontend
      </Box>
      <Box sx={{ display: "flex", paddingRight: "10%", columnGap: "1rem" }}>
        <Box>Privacy Policy</Box>
        <Box>Terms of Service</Box>
      </Box>
    </Box>
  );
};

export default Footer;
