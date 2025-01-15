import React, { useState, useRef, useCallback } from "react";
import { Button, Chip, Rating, Stack, Card, CardContent } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Products } from "../../types/Product";
import { RootState, AppDispatch, fetchProducts } from "../../redux";
import { useDispatch, useSelector } from "react-redux";

const NR_PRODUCTS_TO_FETCH = 20;
interface ProductsI {
  products?: Products | null;
  setCurrentProductId: (productId: number) => void;
}

const ProductsList = (props: ProductsI) => {
  const { setCurrentProductId } = props;

  const dispatch = useDispatch<AppDispatch>();

  const { pageNumber, items, isLoading } = useSelector(
    (state: RootState) => state.products
  );

  const handleProductClick = (id: number) => {
    setCurrentProductId(id);
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback((node: any) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(fetchProducts({}));
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <Stack direction="column">
      {items &&
        items.map((product, idx) => {
          return (
            <Card
              key={product.id}
              sx={{
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#fafafa",
                },
                transition: "background-color 0.5s ease-in-out",
              }}
              onClick={() => handleProductClick(product.id)}
              ref={
                product.id === pageNumber * NR_PRODUCTS_TO_FETCH - 5
                  ? lastBookElementRef
                  : null
              }
            >
              <CardContent sx={{}}>
                <Stack direction={"row"} sx={{}}>
                  <Stack
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: "5px",
                    }}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.id.toString()}
                      style={{ width: "50px", height: "50px" }}
                    ></img>
                  </Stack>

                  <Stack>
                    <Stack sx={{ p: "5px" }}>
                      <h4
                        style={{
                          margin: 0,
                          paddingBottom: "5px",
                        }}
                      >
                        {product.title}
                      </h4>
                      <p
                        style={{
                          paddingBottom: "5px",
                          display: "-webkit-box",
                          maxWidth: "100%",
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textAlign: "justify",
                        }}
                      >
                        {product.description}
                      </p>
                      <Rating
                        name="text-feedback"
                        value={product.rating}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </Stack>
                  </Stack>
                  <Stack
                    direction={"column"}
                    sx={{
                      justifyContent: "space-between",
                      padding: "5px",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5 style={{ margin: "5px" }}>{product.price}$</h5>
                      <Chip
                        size="small"
                        label={`-${product.discountPercentage}%`}
                        sx={{ backgroundColor: "#38a154", color: "white" }}
                      />
                    </Stack>
                    <Stack direction={"row"} sx={{ alignItems: "center" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          backgroundColor: "#4989c9",
                          whiteSpace: "nowrap",
                          padding: "0px 5px",
                          textTransform: "none",
                          color: "white",
                          border: 0,
                          marginRight: "5px",
                        }}
                      >
                        Add to cart
                      </Button>
                      <StarBorderIcon></StarBorderIcon>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
    </Stack>
  );
};

export default ProductsList;
