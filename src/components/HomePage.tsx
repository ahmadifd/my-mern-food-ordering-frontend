import { Box } from "@mui/material";
import SearchBar from "../features/search/SearchBar";
import { useNavigate } from "react-router-dom";

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
      <SearchBar
        placeHolder="Search by City or Town"
        onSubmit={handleSearchSubmit}
      />
    </Box>
  );
};

export default Home;
