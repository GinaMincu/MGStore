import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

interface ProductsState {
  items: any[];
  error: string | null;
  pageNumber: number;
  isLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  error: null,
  isLoading: false,
  pageNumber: 0,
};

const fetchProducts = createAsyncThunk<
  any,
  { limit?: number; skip?: number; select?: string }
>("products/fetch", async (settings = {}, { getState }) => {
  const state = getState() as any;
  let query = "?";

  if (settings.limit) {
    query += `limit=${settings.limit}&`;
  } else {
    query += `limit=20&`;
  }
  if (settings.skip) {
    query += `skip=${settings.skip}&`;
  } else {
    query += `skip=${state.products.pageNumber * 20}&`;
  }
  if (settings.select) {
    query += `select=${settings.select}`;
  }
  const response = await axios.get(`${API_URL}/products${query}`);
  return response.data.products;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.items = [...state.items, ...action.payload];
          state.error = null;
          state.isLoading = false;
          state.pageNumber += 1;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = "Unknown error occurred";
        state.isLoading = false;
      });
  },
});

export { fetchProducts };
export default productsSlice.reducer;
