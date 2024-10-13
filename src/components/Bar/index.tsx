import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Menu,
  MenuItem,
  ListItemText,
  Box,
} from "@mui/material";
import { ProductWithQuantity } from "../../App";

interface BarProps {
  favouriteProducts?: ProductWithQuantity[] | null;
  cartProducts?: ProductWithQuantity[] | null;
}

const Bar = (props: BarProps) => {
  const { favouriteProducts, cartProducts } = props;
  const [btn, setBtn] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleStarClick = (event: React.MouseEvent<HTMLElement>) => {
    setBtn("star");
    setAnchorEl(event.currentTarget);
  };

  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    setBtn("cart");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      position="sticky"
      style={{
        top: 0,
        backgroundColor: "white",
        color: "black",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px 20px",
        paddingTop: "20px",
      }}
    >
      <img
        src="/images/MG_STORE.png"
        alt="logo"
        style={{ width: "100px", height: "100%" }}
      ></img>

      <TextField
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack direction={"row"}>
        <IconButton onClick={handleCartClick}>
          <AddShoppingCartIcon />
        </IconButton>

        <IconButton onClick={handleStarClick}>
          <StarBorderIcon />
        </IconButton>
      </Stack>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {btn === "star" &&
          (favouriteProducts && favouriteProducts?.length > 0 ? (
            favouriteProducts.map((product) => (
              <MenuItem key={product.product.id} onClick={handleClose}>
                <Stack direction={"row"} sx={{ alignItems: "center" }}>
                  <img
                    src={product.product.images[0]}
                    alt={product.product.id.toString()}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <ListItemText primary={product.product.title} />
                </Stack>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No favorite products</MenuItem>
          ))}

        {btn === "cart" &&
          (cartProducts && cartProducts?.length > 0 ? (
            cartProducts.map((product) => (
              <MenuItem key={product.product.id} onClick={handleClose}>
                <Stack direction={"row"} sx={{ alignItems: "center" }}>
                  <ListItemText primary={product.quantity} />
                  <img
                    src={product.product.images[0]}
                    alt={product.product.id.toString()}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <ListItemText primary={product.product.title} />
                </Stack>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No items in cart</MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default Bar;
