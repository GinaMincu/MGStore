import {AppDispatch, RootState, store} from "./store";
import productsReducer, {fetchProducts} from "./slices/productsSlice";

export {
    store,
    productsReducer,
    fetchProducts
};
export type { AppDispatch, RootState };
