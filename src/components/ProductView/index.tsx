import {
  Box,
  Button,
  Chip,
  Rating,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ProductDTO } from "../../types/Product";

interface ProductViewProps {
  currentProduct?: ProductDTO | null;
  setBtnClicked: (btn: string) => void;
}

const ProductView = (props: ProductViewProps) => {
  const { currentProduct, setBtnClicked } = props;

  return currentProduct ? (
    <Stack
      gap={"10px"}
      sx={{
        flexDirection: "row",
        height: "100%",
        py: "10px",
        px: "10px",
        "@media only screen and (max-width: 600px)": {
          flexDirection: "column",
          "#left": {
            width: "100%",
          },
          "#right": {
            width: "100%",
          },
        },
      }}
    >
      <Stack
        direction="column"
        id="left"
        sx={{
          width: "60%",
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
            {currentProduct && currentProduct.title}
          </Typography>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <h4 style={{ marginRight: "10px" }}>
              {currentProduct && currentProduct.price}$
            </h4>
            <Chip
              size="small"
              label={`-${currentProduct && currentProduct.discountPercentage}%`}
              sx={{ backgroundColor: "#38a154", color: "white" }}
            />
          </Stack>
        </Stack>

        <Stack>
          <img
            src={(currentProduct && currentProduct.images[0])}
            alt={
              (currentProduct && currentProduct.id.toString())
            }
            style={{ width: "500px", height: "300px", objectFit: "contain" }}
          ></img>
        </Stack>

        <Stack direction={"column"}>
          <Typography sx={{ textAlign: "justify" }}>
            {currentProduct && currentProduct.description}
          </Typography>
          <Typography sx={{ mt: "20px" }}>
            <Box component={"span"} sx={{ fontWeight: "bold" }}>
              Dimensions:{" "}
            </Box>
            {currentProduct &&
              `${currentProduct.dimensions.height} x ${currentProduct.dimensions.width} x ${currentProduct.dimensions.depth}`}{" "}
            mm
          </Typography>
          <Typography>
            Weight: {currentProduct && currentProduct.weight} g
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction="column"
        id="right"
        sx={{
          justifyContent: "space-between",
          width: "40%",
        }}
      >
        <Stack
          direction={"column"}
          sx={{ alignItems: "end", marginTop: "20px" }}
        >
          <Rating
            name="text-feedback"
            value={currentProduct && currentProduct.weight}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            sx={{ marginBottom: "20px" }}
          />
          <TextareaAutosize
            style={{ width: "80%", height: "200px" }}
            placeholder="Leave a review here"
          />
        </Stack>
        <Stack direction={"row"} sx={{ justifyContent: "end" }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "#4989c9",
              whiteSpace: "nowrap",
              padding: "0px 5px",
              textTransform: "none",
              color: "white",
              border: 0,
              marginRight: "10px",
              fontWeight: "bold",
            }}
            onClick={() => setBtnClicked("cart")}
          >
            Add to cart
          </Button>
          <Button
            size="small"
            sx={{
              whiteSpace: "nowrap",
              textTransform: "none",
              padding: 0,
              minWidth: 0,
            }}
            onClick={() => setBtnClicked("favourite")}
          >
            <StarBorderIcon />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <></>
  );
};

export default ProductView;
