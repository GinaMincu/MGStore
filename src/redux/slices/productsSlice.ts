import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';

interface ProductsState {
  items: any[]; 
  error: string | null; 
}

const initialState: ProductsState = {
  items: [],
  error: null,
};

const fetchProducts = createAsyncThunk<any, { limit?: number; skip?: number; select?: string }>(
  'products/fetch',
  async (settings: { limit?: number; skip?: number; select?: string } = {}) => {
    let query = '?';

    if (settings.limit) {
      query += `limit=${settings.limit}&`;
    }
    if (settings.skip) {
      query += `skip=${settings.skip}&`;
    }
    if (settings.select) {
      query += `select=${settings.select}`;
    }
    const response = await axios.get(`${API_URL}/products${query}`);
    return response.data.products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = 'Unknown error occurred';
      });
  },
});

export { fetchProducts };
export default productsSlice.reducer;
