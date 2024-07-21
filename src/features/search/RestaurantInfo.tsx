import { RestaurantType } from "../../types/Restaurant.types";
import { Box, Card, CardContent, CardHeader } from "@mui/material";

type Props = {
  restaurant: RestaurantType;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card>
      <CardHeader title={restaurant?.details?.restaurantName} />
      <CardContent>
        {restaurant?.details?.city}, {restaurant?.details?.country}
      </CardContent>
      <CardContent>
        <Box mt={1} sx={{ display: "flex", flexWrap: "wrap" }}>
          {restaurant?.cuisines?.map((item, index) => (
            <Box key={index}>
              {item} {index + 1 < restaurant?.cuisines?.length! && ","}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
