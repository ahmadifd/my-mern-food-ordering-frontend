import { ReactElement, createContext, useEffect, useState } from "react";
import { DetailsType, RestaurantType } from "../types/Restaurant.types";
import { MenuItem } from "../types/MenuItem.types";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  getMyRestaurant,
  myRestaurant,
} from "../features/restaurant/myRestaurantSlice";
import { FetchingStatus } from "../types/types";

type RestaurantContextType = {
  restaurant: RestaurantType | null;
  setRestaurant: React.Dispatch<React.SetStateAction<RestaurantType>>;
  details: DetailsType;
  setDetails: React.Dispatch<React.SetStateAction<DetailsType>>;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  cuisines: string[];
  setCuisines: React.Dispatch<React.SetStateAction<string[]>>;
};

export const RestaurantContext = createContext<RestaurantContextType>(
  {} as RestaurantContextType
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

const RestaurantProvider = ({ children }: ChildrenType) => {
  const dispatch = useAppDispatch();

  const currentRestaurant = useAppSelector(myRestaurant);
  const isLoading = useAppSelector((state) => state.myRestaurant.statusGet);

  const [restaurant, setRestaurant] = useState<RestaurantType>({
    details: {
      restaurantName: currentRestaurant?.details?.restaurantName ?? "",
      city: currentRestaurant?.details?.city ?? "",
      country: currentRestaurant?.details?.country ?? "",
      deliveryPrice: currentRestaurant?.details?.deliveryPrice ?? "",
      estimatedDeliveryTime:
        currentRestaurant?.details?.estimatedDeliveryTime ?? "",
    },
    menuItems: [],
    cuisines: [],
    imageFile: null,
    imageUrl: null,
    isEditing: false,
  });

  const [details, setDetails] = useState<DetailsType>(restaurant?.details!);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    restaurant?.menuItems!
  );
  const [cuisines, setCuisines] = useState<string[]>(restaurant?.cuisines!);

  useEffect(() => {
    dispatch(getMyRestaurant());
  }, []);

  useEffect(() => {
    if (currentRestaurant) {
      setRestaurant({ ...currentRestaurant, isEditing: true });
      setDetails(currentRestaurant?.details!);
      setCuisines(currentRestaurant?.cuisines!);
      setMenuItems(currentRestaurant?.menuItems!);
    }
  }, [currentRestaurant]);

  return (
    <RestaurantContext.Provider
      value={{
        details,
        setDetails,
        menuItems,
        setMenuItems,
        cuisines,
        setCuisines,
        restaurant,
        setRestaurant,
      }}
    >
      {isLoading === FetchingStatus.loading ? <h1>...isLoading</h1> : children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
