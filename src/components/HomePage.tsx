import { Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import HomeSearchBar from "./HomeSearchBar";

const Home = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchQuery: string) => {
    navigate({
      pathname: `/search/${searchQuery}`,
    });
  };
  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        minHeight: "100%",
      }}
    >
      <HomeSearchBar
        placeHolder="Search by City or Town"
        onSubmit={handleSearchSubmit}
      />
    </Box>
  );
};

export default Home;
