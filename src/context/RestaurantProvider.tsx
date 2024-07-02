import { ReactElement, createContext, useState } from "react";
import { RestaurantType } from "../types/Restaurant.types";

export type RestaurantContextType = {
  restaurant: RestaurantType | null;
  setRestaurant: React.Dispatch<React.SetStateAction<RestaurantType>>;
  count: number;
};

export const RestaurantContext = createContext<RestaurantContextType>(
  {} as RestaurantContextType
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

const RestaurantProvider = ({ children }: ChildrenType) => {
  const [restaurant, setRestaurant] = useState<RestaurantType>({
    details: {
      name: "1",
      city: "1",
      country: "1",
      deliveryPrice: "1",
      estimatedDeliveryTime: "1",
    },
    menu: [{ name: "1", price: "1" }],
    cuisines: ["Pasta"],
    file: null,
  });
  const count: number = 1;
  return (
    <RestaurantContext.Provider value={{ restaurant, setRestaurant, count }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
