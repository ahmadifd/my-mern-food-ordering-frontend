import { useState } from "react";
import { RestaurantType } from "../types/Restaurant.types";

type MenuType = {
  name: string;
  price: string;
};

const useMenuArray = (
  restaurant: RestaurantType,
  setRestaurant: React.Dispatch<React.SetStateAction<RestaurantType>>
) => {
  const appendMenu = (menu: MenuType) => {
    const newrestaurant = { ...restaurant };
    newrestaurant.menu = [...(restaurant.menu ?? []), menu];
    setRestaurant(newrestaurant as RestaurantType);
  };
  const setMenu = (index: number, menu: MenuType) => {
    const newrestaurant = { ...restaurant };
    newrestaurant.menu = [
      ...(restaurant.menu?.slice(0, index) ?? []),
      { ...menu },
      ...(restaurant.menu?.slice(index + 1, restaurant.menu?.length) ?? []),
    ];
    setRestaurant(newrestaurant as RestaurantType);
  };
  const removeMenu = (index: number) => {
    const newrestaurant = { ...restaurant };
    newrestaurant.menu =
      restaurant.menu?.filter((_item, itemindex) => itemindex !== index) ?? [];
    setRestaurant(newrestaurant as RestaurantType);
  };
  return { setMenu, appendMenu, removeMenu };
};

export default useMenuArray;
