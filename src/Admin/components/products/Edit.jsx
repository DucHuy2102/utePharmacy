import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  deleteImg,
  getSingleProduct,
  singleProductsSelector,
  updateProduct,
} from "../../store/reducers/productsSlice";
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  TextField,
  Tooltip,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ImgUpload from "./ImgUpload";
const Detail = () => {
  // handle change input
  const handleChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  // param in url
  let [searchParams] = useSearchParams();

  // redux
  const product = useSelector(singleProductsSelector);
  const dispatch = useDispatch();

  //state
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [numberSelected] = useState(0);

  useEffect(() => {
    dispatch(getSingleProduct(searchParams.get("id")));
    window.scrollTo(0, 0);
    setUpdatedProduct({ ...product });
  }, [dispatch, product, searchParams]);
  useEffect(() => {
    setUpdatedProduct({ ...product });
  }, [product]);
  // navigate
  const navigate = useNavigate();

  //   logic
  if (product.loading) {
    return <CircularProgress />;
  }

  // handle update product
  const handleUpdateProduct = () => {
    swal({
      title: "Are you sure?",
      text: "Once updated, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUpdated) => {
      if (willUpdated) {
        dispatch(updateProduct(updatedProduct));
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        navigate(`../product/detail/?id=${updatedProduct.product_id}`);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    dispatch(updateProduct(updatedProduct));
  };

  // handle delete one img
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this image!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDeleted) => {
      if (willDeleted) {
        dispatch(deleteImg(id));
        swal("Poof! Your image has been deleted!", {
          icon: "success",
        });
        navigate(`../product/edit/?id=${updatedProduct.product_id}`);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // handle change carosel
  const handleChangeCarosel = (index, item) => {};
  return (
    <>
      <Wrap className="mb-10">
        <Container>
          <Carousel
            selectedItem={numberSelected}
            onChange={(index, item) => handleChangeCarosel(index, item)}
            // onSwipeEnd={() => setNumberSelected(10000)}
          >
            <div className="position-relative">
              <img src={product.img_cover} alt="" />
              <Popup
                trigger={
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    placement="top-end"
                    className="position-absolute top-10 start-50"
                    onClick={() => alert("them img ")}
                  >
                    Add
                  </Button>
                }
                modal
              >
                <span>
                  {" "}
                  {/* Modal content */}
                  <ImgUpload idProduct={product.product_id} />
                </span>
              </Popup>
            </div>
            {product.imgList.map((imgItem) => (
              <div>
                <img src={imgItem.url} alt="" />
                <Tooltip
                  title="Delete"
                  placement="top-end"
                  className="position-absolute bottom-40 start-0"
                >
                  <Button
                    variant="contained"
                    color="error"
                    size="medium"
                    placement="top-end"
                    onClick={() => handleDelete(imgItem.id)}
                  >
                    Delete
                  </Button>
                </Tooltip>
                {/* <Tooltip
                  title="Add"
                  placement="top-end"
                  className="position-absolute top-10 start-50 "
                > */}
                {/* <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    placement="top-end"
                    onClick={() => alert("them img ")}
                  > */}
                <Popup
                  trigger={(open) => {
                    return (
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        placement="top-end"
                        className="position-absolute top-10 start-50"
                      >
                        Add
                      </Button>
                    );
                  }}
                  lockScroll={true}
                  modal
                >
                  <div style={{ overflowY: "scroll" }}>
                    <ImgUpload idProduct={product.product_id} />
                  </div>
                </Popup>
                {/* Add
                  </Button> */}
                {/* </Tooltip> */}
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
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => handleUpdateProduct()}
            >
              <DoneIcon />
            </Fab>
          </Box>

          <TextField
            id="outlined-basic"
            label="Id"
            variant="outlined"
            name="id"
            className="mt-3"
            value={updatedProduct.product_id}
            fullWidth
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            className="mt-3"
            value={updatedProduct.name}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
          <TextField
            id="outlined-basic"
            label="Brand"
            variant="outlined"
            name="brand"
            className="mt-3"
            value={updatedProduct.brand}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
          <TextField
            id="outlined-basic"
            className="mt-3"
            label="Amount"
            variant="outlined"
            name="amount"
            type='number'
            value={updatedProduct.amount}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
          <TextField
            id="outlined-basic"
            label="Cpu"
            className="mt-3"
            variant="outlined"
            name="cpu"
            value={updatedProduct.cpu}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
          <TextField
            id="outlined-basic"
            label="Description"
            className="mt-3"
            variant="outlined"
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
          <TextField
            id="outlined-basic"
            className="mt-3"
            label="Gpu"
            variant="outlined"
            name="gpu"
            value={updatedProduct.gpu}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
          <TextField
            id="outlined-basic"
            className="mt-3"
            label="OS"
            variant="outlined"
            name="os"
            value={updatedProduct.os}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
          <TextField
            id="outlined-basic"
            className="mt-3"
            label="Price"
            variant="outlined"
            name="price"
            type='number'
            value={updatedProduct.price}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
          <TextField
            id="outlined-basic"
            className="mt-3"
            label="RAM"
            variant="outlined"
            name="ram"
            value={updatedProduct.ram}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
          <TextField
            id="outlined-basic"
            label="Rating"
            variant="outlined"
            name="rating"
            className="mt-3"
            value={updatedProduct.rating}
            fullWidth
            disabled
          />
          <TextField
            id="outlined-basic"
            className="mt-3"
            label="Screen"
            variant="outlined"
            name="screen"
            value={updatedProduct.screen}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
          <TextField
            id="outlined-basic"
            className="mt-3"
            label="Size"
            variant="outlined"
            name="size"
            value={updatedProduct.size}
            onChange={handleChange}
            fullWidth
            autoComplete
          />
        </Container>
      </Wrap>
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
  margin-bottom: 100px;
`;
const Container = styled.div`
  width: 100%;
  max-width: 700px;
`;

export default Detail;
