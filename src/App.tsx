import React, { useEffect, useState } from "react";
import "./App.css";
import ProductsList from "./components/ProductsList";
import Bar from "./components/Bar";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, fetchProducts } from "./redux";
import { Card, Stack } from "@mui/material";
import ProductView from "./components/ProductView";
import { ProductDTO, Products } from "./types/Product";

export interface ProductWithQuantity {
  product: ProductDTO;
  quantity: number;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, []);

  const [currentProductId, setCurrentProductId] = useState(0);
  const [currentProduct, setCurrentProduct] = useState<ProductDTO | null>(null);

  useEffect(() => {
    const currentProduct = items.find((item) => item.id === currentProductId);
    if (currentProduct) {
      setCurrentProduct(currentProduct);
    }
  }, [currentProductId]);

  const [favouriteProducts, setFavouriteProducts] = useState<
    ProductWithQuantity[]
  >([]);
  const [cartProducts, setCartProducts] = useState<ProductWithQuantity[]>([]);

  const handleAddProducts = (btn: string) => {
    if (currentProduct) {
      if (btn === "favourite") {
        setFavouriteProducts((prevProds) => {
          const existingProduct = prevProds.find(
            (item) => item.product.id === currentProduct.id
          );
          if (existingProduct) {
            return prevProds.map((item) =>
              item.product.id === currentProduct.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevProds, { product: currentProduct, quantity: 1 }];
          }
        });
      }

      if (btn === "cart") {
        setCartProducts((prevProds) => {
          const existingProduct = prevProds.find(
            (item) => item.product.id === currentProduct.id
          );

          if (existingProduct) {
            return prevProds.map((item) =>
              item.product.id === currentProduct.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevProds, { product: currentProduct, quantity: 1 }];
          }
        });
      }
    }
  };

  return (
    <Stack
      className="App"
      sx={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}
    >
      <Bar
        favouriteProducts={favouriteProducts}
        cartProducts={cartProducts}
      ></Bar>

      <Stack
        gap={"10px"}
        sx={{
          // minHeight: "100vh",
          flexDirection: "row",

          "@media only screen and (max-width: 600px)": {
            flexDirection: "column-reverse",

            "#product-list": {
              width: "100%",
            },
            "#product-view": {
              height: "auto",
            },
          },
          padding: "10px",
        }}
      >
        <Stack
          id="product-list"
          sx={{
            height: "650px",
            width: "700px",
            overflowY: "auto",
            paddingRight: "3px",
            margin: 0,
          }}
        >
          <ProductsList setCurrentProductId={setCurrentProductId} />
        </Stack>
        <Card>
          <Stack
            id="product-view"
            sx={{
              height: "650px",
              width: "100%",
            }}
          >
            <ProductView
              currentProduct={currentProduct}
              setBtnClicked={handleAddProducts}
            />
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}

export default App;
