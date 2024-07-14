import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "info.dark",
        color: "white",
        fontWeight: "bold",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
      fontSize={14}
    >
      <Box
        sx={{
          textWrap: "nowrap",
          marginLeft: "5%",
        }}
      >
        my-mern-frontend
      </Box>
      <Box sx={{ display: "flex", marginRight: "5%" }} columnGap={2}>
        <Box sx={{ textWrap: "nowrap" }}>Privacy Policy</Box>
        <Box sx={{ textWrap: "nowrap" }}>Terms of Service</Box>
      </Box>
    </Box>
  );
};

export default Footer;
