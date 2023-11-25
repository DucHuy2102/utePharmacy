import React, { useEffect } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import TextContainer from "./TextContainer";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "reactjs-popup/dist/index.css";
import {
  getSingleProduct,
  singleProductsSelector,
} from "../../store/reducers/productsSlice";
import { Box, CircularProgress, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Comment from "./Comment";
const Detail = () => {
  // param in url
  let [searchParams] = useSearchParams();

  // redux
  const product = useSelector(singleProductsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(searchParams.get("id")));
    window.scrollTo(0, 0);
  }, [dispatch, searchParams]);
  // navigate
  const navigate = useNavigate();
  if (product.loading) return <CircularProgress />;
  return (
    <>
      <Wrap>
        <Container>
          <Carousel autoPlay>
            <div>
              <img src={product.img_cover} alt="" />
            </div>
            {product.imgList.map((imgItem) => (
              <div>
                <img src={imgItem.url} alt="" />
              </div>
            ))}
          </Carousel>
        </Container>
        <Container>
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
              position: "fixed",
              // display: "flex",
              // justifyContent: "flex-end",
              right: "10px",
              bottom: "20px",
            }}
          >
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
            <Fab
              color="secondary"
              aria-label="edit"
              onClick={() =>
                navigate(`../product/edit?id=${product.product_id}`)
              }
            >
              <EditIcon />
            </Fab>
          </Box>

          <TextContainer label="ID" text={product.product_id} />
          <TextContainer label="Name" text={product.name} />
          <TextContainer label="Brand" text={product.brand} />
          <TextContainer label="Amount" text={product.amount} />
          <TextContainer label="CPU" text={product.cpu} />
          <TextContainer label="Description" text={product.description} />
          <TextContainer label="GPU" text={product.gpu} />
          <TextContainer label="OS" text={product.os} />
          <TextContainer label="Price" text={product.price} />
          <TextContainer label="Ram" text={product.ram} />
          <TextContainer label="Rating" text={product.rating} />
          <TextContainer label="Screen" text={product.screen} />
          <TextContainer label="Size" text={product.size} />
        </Container>
      </Wrap>
      <Comment id={product.product_id} />
    </>
  );
};
// CSS
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 10px 20px;
`;
const Container = styled.div`
  width: 100%;
  max-width: 700px;
`;

export default Detail;
