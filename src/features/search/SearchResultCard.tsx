import { Link } from "react-router-dom";
import { RestaurantType } from "../../types/Restaurant.types";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type Props = {
  restaurant: RestaurantType;
};

const SearchResultCard = ({ restaurant }: Props) => {
  const theme = useTheme();
  const xsmall = useMediaQuery(theme.breakpoints.up("xs"));
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  const large = useMediaQuery(theme.breakpoints.up("lg"));
  const xlarge = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Link to={`/detail/${restaurant._id}`}>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={5}>
          <img
            style={{
              borderRadius: "10px",
              width: "100%",
              height: medium ? "20vh" : xsmall ? "50vh" : "",
            }}
            src={restaurant?.imageUrl!}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Box sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {restaurant?.details?.restaurantName}
              </Box>
              <Box mt={1} sx={{ display: "flex", flexWrap: "wrap" }}>
                {restaurant?.cuisines?.map((item, index) => (
                  <Box key={index}>
                    {item} {index + 1 < restaurant?.cuisines?.length! && ","}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <AccessTimeIcon />
                </Box>
                <Box>{restaurant?.details?.estimatedDeliveryTime} mins</Box>
              </Box>
              <Box mt={1}>
                Delivery from {restaurant?.details?.deliveryPrice!}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Link>
  );
};

export default SearchResultCard;
