import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { GetAxiosAutoRefresh } from "../../app/api/axios";
import { RestaurantType } from "../../types/Restaurant.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

enum FetchingStatus {
  "idle",
  "loading",
  "succeeded",
  "failed",
}

interface myRestaurantState {
  status: FetchingStatus;
  error: SerializedError | null;
  restaurantInfo: RestaurantType | null;
}

const initialState: myRestaurantState = {
  status: FetchingStatus.idle,
  error: null,
  restaurantInfo: null,
};

const RESTAURANT_URL = `/my/restaurant/`;

export const getMyRestaurant = createAsyncThunk(
  "restaurant/getMyRestaurant",
  async (_arg, api) => {
    const token = (api.getState() as RootState).auth.token;
    const axios = new GetAxiosAutoRefresh(token, "application/json");
    const response = await axios.get(RESTAURANT_URL + `getRestaurant`);
    if (!response.data) throw new Error("No Content");

    return response.data;
  }
);

export const createMyRestaurant = createAsyncThunk(
  "restaurant/createMyRestaurant",
  async (formData: FormData, api) => {
    const token = (api.getState() as RootState).auth.token;

    const axios = new GetAxiosAutoRefresh(token, "multipart/form-data");
    const response = await axios.post(
      API_BASE_URL + "my/restaurant/createRestaurant",
      { data: formData }
    );
    return response.data;
  }
);

export const editMyRestaurant = createAsyncThunk(
  "restaurant/editMyRestaurant",
  async (formData: FormData, api) => {
    const token = (api.getState() as RootState).auth.token;

    const axios = new GetAxiosAutoRefresh(token, "multipart/form-data");
    const response = await axios.put(
      API_BASE_URL + "my/restaurant/editRestaurant",
      { data: formData }
    );
    return response.data;
  }
);

const myRestauranSlice = createSlice({
  name: "myRestaurant",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMyRestaurant.pending, (state) => {
      state.status = FetchingStatus.loading;
    });
    builder.addCase(getMyRestaurant.fulfilled, (state, action) => {
      state.status = FetchingStatus.succeeded;
      const data = action.payload;
      const restaurant = {
        details: {
          restaurantName: data.restaurantName,
          city: data.city,
          country: data.country,
          deliveryPrice: data.deliveryPrice,
          estimatedDeliveryTime: data.estimatedDeliveryTime,
        },
        cuisines: data.cuisines,
        menuItems: data.menuItems,
        imageFile: null,
        imageUrl: data.imageUrl,
        isEditing: false,
      };

      state.restaurantInfo = restaurant;
    });
    builder.addCase(getMyRestaurant.rejected, (state) => {
      state.status = FetchingStatus.failed;
    });
    builder.addCase(createMyRestaurant.fulfilled, (state, action) => {
      state.status = FetchingStatus.succeeded;
      const data = action.payload;
      const restaurant = {
        details: {
          restaurantName: data.restaurantName,
          city: data.city,
          country: data.country,
          deliveryPrice: data.deliveryPrice,
          estimatedDeliveryTime: data.estimatedDeliveryTime,
        },
        cuisines: data.cuisines,
        menuItems: data.menuItems,
        imageFile: null,
        imageUrl: data.imageUrl,
        isEditing: false,
      };

      state.restaurantInfo = restaurant;
    });
    builder.addCase(editMyRestaurant.fulfilled, (state, action) => {
      state.status = FetchingStatus.succeeded;
      const data = action.payload;
      const restaurant = {
        details: {
          restaurantName: data.restaurantName,
          city: data.city,
          country: data.country,
          deliveryPrice: data.deliveryPrice,
          estimatedDeliveryTime: data.estimatedDeliveryTime,
        },
        cuisines: data.cuisines,
        menuItems: data.menuItems,
        imageFile: null,
        imageUrl: data.imageUrl,
        isEditing: false,
      };
      state.restaurantInfo = restaurant;
    });
    builder.addCase(editMyRestaurant.rejected, (state, action) => {
      state.error = action.error;
      state.status = FetchingStatus.failed;
    });
  },
});

export const myRestaurant = (state: RootState) =>
  state.myRestaurant.restaurantInfo;

export const restaurantError = (state: RootState) => state.myRestaurant.error;

export default myRestauranSlice.reducer;
