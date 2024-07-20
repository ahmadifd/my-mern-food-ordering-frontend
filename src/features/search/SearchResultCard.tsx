import { Link } from "react-router-dom";
import { RestaurantType } from "../../types/Restaurant.types";

type Props = {
  restaurant: RestaurantType;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link to={`/detail/${restaurant._id}`}>
      <img src={restaurant?.imageUrl!} />
      {restaurant?.details?.restaurantName}
      {restaurant?.cuisines?.map((item, index) => (
        <span className="flex">
          <span>{item}</span>
          {index < restaurant?.cuisines?.length! - 1 && "..."}
        </span>
      ))}
      {restaurant?.details?.estimatedDeliveryTime} mins Delivery from £
      {restaurant?.details?.deliveryPrice!}
    </Link>
  );
};

export default SearchResultCard;
