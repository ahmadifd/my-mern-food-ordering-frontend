export type DetailsType = {
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: string;
  estimatedDeliveryTime: string;
};

export type RestaurantType = {
  _id?: string;
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

export type DbRestaurantType = DetailsType & RestaurantType;
