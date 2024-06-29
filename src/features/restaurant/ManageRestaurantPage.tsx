import { Box } from "@mui/material";
import CuisinesSection from "./CuisinesSection";
import DetailsSection from "./DetailsSection";
import ImageSection from "./ImageSection";
import MenuSection from "./MenuSection";

const ManageRestaurantPage = () => {
  return (
    <Box>
      <DetailsSection />
      <CuisinesSection />
      <MenuSection />
      <ImageSection />
    </Box>
  );
};

export default ManageRestaurantPage;
