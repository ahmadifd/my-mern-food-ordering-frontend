import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { GetAxiosAutoRefresh } from "../../app/api/axios";
import { DbRestaurantType, RestaurantType } from "../../types/Restaurant.types";
import { SearchState } from "./SearchPage";

enum FetchingStatus {
  "idle",
  "loading",
  "succeeded",
  "failed",
}

interface ExtendedEntityAdapterState {
  status: FetchingStatus;
  error: SerializedError | null;
  count: number;
}

const initialState: ExtendedEntityAdapterState = {
  status: FetchingStatus.idle,
  error: null,
  count: 0,
};

const RESTAURANT_URL = `/restaurant/`;

const restaurantsAdapter = createEntityAdapter({
  selectId: (restaurant: RestaurantType) => restaurant._id!,
});

export const searchRestaurant = createAsyncThunk(
  "restaurant/getRestaurants",
  async ({ params, city }: { params: URLSearchParams; city?: string }, api) => {
    const token = (api.getState() as RootState).auth.token;
    const axios = new GetAxiosAutoRefresh(token, "application/json");
    const response = await axios.get(
      RESTAURANT_URL + `search/${city}?${params.toString()}`
    );
    if (!response.data) throw new Error("No Content");

    return response.data;
  }
);

const restauranSlice = createSlice({
  name: "restaurants",
  initialState: restaurantsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchRestaurant.pending, (state) => {
      state.status = FetchingStatus.loading;
    });
    builder.addCase(searchRestaurant.fulfilled, (state, action) => {
      state.status = FetchingStatus.succeeded;

      const loadedRestaurants = action.payload.data.map(
        (data: DbRestaurantType) => ({
          details: {
            restaurantName: data.restaurantName,
            city: data.city,
            country: data.country,
            deliveryPrice: data.deliveryPrice,
            estimatedDeliveryTime: data.estimatedDeliveryTime,
          },
          _id: data._id,
          cuisines: data.cuisines,
          menuItems: data.menuItems,
          imageFile: null,
          imageUrl: data.imageUrl,
          isEditing: true,
        })
      );
      state.count = action.payload.data.length;

      console.log(loadedRestaurants);

      restaurantsAdapter.removeAll(state);
      restaurantsAdapter.upsertMany(state, loadedRestaurants);
    });
    builder.addCase(searchRestaurant.rejected, (state) => {
      restaurantsAdapter.removeAll(state);
      state.count = 0;
      state.status = FetchingStatus.failed;
    });
  },
});

export const {
  selectAll: selectSearchedRestaurants,
  selectById: selectRestaurantById,
  selectIds: selectRestaurantIds,
  // Pass in a selector that returns the posts slice of state
} = restaurantsAdapter.getSelectors((state: RootState) => state.restaurants);

// export const myRestaurant = (state: RootState) =>
//   state.myRestaurant.restaurantInfo;

export const searchRestaurantsCount = (state: RootState) =>
  state.restaurants.count;

export default restauranSlice.reducer;
