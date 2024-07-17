import { Box, Grid } from "@mui/material";
import { useState } from "react";
import CuisineFilter from "./CuisineFilter";
import SearchBar from "./SearchBar";
import SearchResultInfo from "./SearchResultInfo";
import SortOptionDropdown from "./SortOptionDropdown";
import PaginationSelector from "./PaginationSelector";
import SearchResultCard from "./SearchResultCard";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box>
          <Box>
            <SearchBar
              searchQuery={searchState.searchQuery}
              onSubmit={setSearchQuery}
              placeHolder="Search by Cuisine or Restaurant Name"
              onReset={resetSearch}
            />
          </Box>
          <Box
            sx={{
            
              display: "flex",
              textWrap: "nowrap",
              alignItems: "center",
            }}
            columnGap={3}
          >
            <Box>
              <SearchResultInfo />
            </Box>
            <Box
              sx={{
                marginLeft: "auto",
              }}
            >
              <SortOptionDropdown />
            </Box>
          </Box>
          <Box>
            <SearchResultCard />
          </Box>
          <Box sx={{display:"grid", justifyContent:"center"}}>
            <PaginationSelector />
          </Box>
        </Box>
      </Grid>
    </Grid>
    // <Box className="searchPage" sx={{ display: "grid" }}>
    //   <Box className="searchPage-cusine">

    //   </Box>
    //   <Box className="searchPage-searchBar">werter</Box>
    // </Box>
  );
};

export default SearchPage;
