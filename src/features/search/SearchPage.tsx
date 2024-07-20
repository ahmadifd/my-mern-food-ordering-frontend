import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CuisineFilter from "./CuisineFilter";
import SearchBar from "./SearchBar";
import SearchResultInfo from "./SearchResultInfo";
import SortOptionDropdown from "./SortOptionDropdown";
import PaginationSelector from "./PaginationSelector";
import SearchResultCard from "./SearchResultCard";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  searchRestaurant,
  searchRestaurantsCount,
  selectSearchedRestaurants,
} from "./restaurantsSlice";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};
const pageSize = 5;
const SearchPage = () => {
  const { city } = useParams();
  const dispatch = useAppDispatch();
  const restaurants = useAppSelector(selectSearchedRestaurants);
  const restaurantsCount = useAppSelector(searchRestaurantsCount);

  console.log(restaurants);

  const createSearchRequest = () => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("pageSize", pageSize.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);
    dispatch(searchRestaurant({ city, params }));
  };

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  useEffect(() => {
    createSearchRequest();
  }, [
    searchState.searchQuery,
    searchState.page,
    searchState.sortOption,
    JSON.stringify(searchState.selectedCuisines),
  ]);

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

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
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
              <SearchResultInfo total={restaurantsCount} city={city ?? ""} />
            </Box>
            <Box
              sx={{
                marginLeft: "auto",
              }}
              mt={1}
            >
              <SortOptionDropdown
                sortOption={searchState.sortOption}
                onChange={(value) => setSortOption(value)}
              />
            </Box>
          </Box>
          <Box>
            {restaurants.map((restaurant, index) => (
              <SearchResultCard key={index} restaurant={restaurant} />
            ))}
          </Box>
          <Box sx={{ display: "grid", justifyContent: "center" }}>
            <PaginationSelector
              page={searchState.page}
              pages={Math.ceil(restaurantsCount / pageSize)}
              onPageChange={setPage}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SearchPage;
