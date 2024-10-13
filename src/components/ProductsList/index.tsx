import React, { useState, useRef, useCallback } from "react";
import {
  Button,
  Chip,
  Rating,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Products } from "../../types/Product";
import useBookSearch from "../customHooks/useProductSearch";

interface ProductsI {
  products?: Products | null;
  setCurrentProductId: (productId: number) => void;
}

const ProductsList = (props: ProductsI) => {
  const { products, setCurrentProductId } = props;

  const handleProductClick = (id: number) => {
    setCurrentProductId(id);
  };

  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const { newProducts, hasMore, loading, error } = useBookSearch(
    query,
    pageNumber,
    products
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Stack direction="column">
      {products && newProducts && newProducts.length <= 0
        ? products.map((product, idx) => {
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
                ref={lastBookElementRef}
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
                        src={product.images[0]}
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
                <div>{loading && "Loading..."}</div>
                <div>{error && "Error"}</div>
              </Card>
            );
          })
        : newProducts.map((product, idx) => {
            return (
              <Card
                key={product.id}
                sx={{
                  marginBottom: "10px",
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "#fafafa",
                  },
                  transition: "background-color 0.5s ease-in-out",
                }}
                onClick={() => handleProductClick(product.id)}
                ref={lastBookElementRef}
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
                        src={product.images[0]}
                        alt="1"
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
                        {/* <StarRating rating={product.rating}/> {product.rating} */}
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
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </Stack>
  );
};

export default ProductsList;
