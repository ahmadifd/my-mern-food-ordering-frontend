import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1, paddingLeft: "10%" }}>MernEats.com</Box>
      <Box sx={{ display: "flex", paddingRight: "10%", columnGap: "1rem" }}>
        <Box>Privacy Policy</Box>
        <Box>Terms of Service</Box>
      </Box>
    </Box>
  );
};

export default Footer;
