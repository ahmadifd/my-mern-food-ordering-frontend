import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { GetAxiosAutoRefresh } from "../../app/api/axios";
import { RestaurantType } from "../../types/Restaurant.types";

enum FetchingStatus {
  "idle",
  "loading",
  "succeeded",
  "failed",
}

interface myRestaurantState {
  status: FetchingStatus;
  error?: string | null;
  restaurantInfo: RestaurantType | null;
}

const initialState: myRestaurantState = {
  status: FetchingStatus.idle,
  error: null,
  restaurantInfo: null,
};

const RESTAURANT_URL = `/my/restaurant/`;

export const getMyRestaurant = createAsyncThunk(
  "restaurant/getRestaurant",
  async (_arg, api) => {
    const token = (api.getState() as RootState).auth.token;
    const axios = new GetAxiosAutoRefresh(token, "application/json");
    const response = await axios.get(RESTAURANT_URL + `getRestaurant`);
    console.log(response.data);
    //axios.eject();
    return response.data;
  }
);

export const createMyRestaurant = createAsyncThunk(
  "restaurant/createRestaurant",
  async (formData: FormData, api) => {
    const token = (api.getState() as RootState).auth.token;
    try {
      const axios = new GetAxiosAutoRefresh(token, "multipart/form-data");
      const response = await axios.post(
        "http://localhost:3800/my/restaurant/createRestaurant",
        { data: formData }
      );
      return response.data;
    } catch (error) {}
  }
);

export const editMyRestaurant = createAsyncThunk(
  "restaurant/editRestaurant",
  async (formData: FormData, api) => {
    const token = (api.getState() as RootState).auth.token;
    try {
      const axios = new GetAxiosAutoRefresh(token, "multipart/form-data");
      const response = await axios.put(
        "http://localhost:3800/my/restaurant/editRestaurant",
        { data: formData }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {}
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
        isEditing: true,
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
        isEditing: true,
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
        isEditing: true,
      };

      state.restaurantInfo = restaurant;
    });
  },
});

export const myRestaurant = (state: RootState) =>
  state.myRestaurant.restaurantInfo;

export default myRestauranSlice.reducer;
