export type DetailsType = {
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: string;
  estimatedDeliveryTime: string;
};

export type RestaurantType = {
  details: DetailsType | null;
  cuisines: string[] | null;
  menuItems:
    | {
        name: string;
        price: string;
      }[]
    | null;
  imageFile: File | null;
  imageUrl: string | null;
  isEditing: boolean;
};
