export type DetailsType = {
  name: string;
  city: string;
  country: string;
  deliveryPrice: string;
  estimatedDeliveryTime: string;
};

export type RestaurantType = {
  details: DetailsType;
  cuisines: string[] | null;
  menu:
    | {
        name: string;
        price: string;
      }[]
    | null;
  file: File | null;
};
