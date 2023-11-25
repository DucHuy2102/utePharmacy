import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUploading from 'react-images-uploading';
import { useNavigate } from 'react-router-dom';
import { Box, Fab } from '@mui/material';
import swal from 'sweetalert';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import AddImgUpload from './AddImgUpload';
const Wraper = styled.div`
    width: 100%;
    background-color: #f3f3f9;
    padding: 20px 0;
    box-sizing: border-box;
`;
const Container = styled.div`
    background-color: white;
    margin: 0 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 6px #b2b2b2;
    padding: 10px;
`;
const Heading = styled.h3`
    font-size: 20px;
`;
const FlexContainer = styled.div`
    display: flex;
`;
const InputLeft = styled.div`
    padding-right: 4px;
    flex: 1;
`;
const InputRight = styled.div`
    padding-left: 4px;
    flex: 1;
`;
const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 0;
`;
const InputLabel = styled.label`
    /* min-width: 150px; */
    flex-basis: 25%;
`;
const Input = styled.input`
    background-color: #ffffff;
    border-color: #ccc;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    font-size: 13px;
    line-height: 19.5px;
    padding: 6px 12px;
    outline: none;
    flex-basis: 70%;
    &:focus {
        border-color: #6e00ff;
    }
`;
const TextArea = styled.textarea`
    resize: 'none';
    overflow: 'auto';
    background-color: #ffffff;
    border-color: #ccc;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    font-size: 13px;
    line-height: 19.5px;
    padding: 6px 12px;
    outline: none;
    flex-basis: 70%;
    &:focus {
        border-color: #6e00ff;
    }
`;
const Select = styled.select`
    background-color: #ffffff;
    border-color: #ccc;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    font-size: 13px;
    line-height: 19.5px;
    padding: 6px 12px;
    outline: none;
    flex-basis: 70%;
`;
const Option = styled.option``;

const AddProduct = () => {
    // img
    const [images, setImages] = React.useState([]);
    const [imagesAdd, setImagesAdd] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
    };
    const onChangeAdd = (imageList, addUpdateIndex) => {
        // data for submit
        setImagesAdd(imageList);
    };
    //  navigate
    const navigate = useNavigate();

    // state
    const [newProduct, setNewProduct] = useState({
        name: '',
        url: '',
        product_code: '',
        brand: '',
        cpu: '',
        ram: '',
        gpu: '',
        os: '',
        price: '',
        old_price: '',
        screen: '',
        size: '',
        battery: '',
        amount: '',
        description: '',
        rating: '',
        num_reviewer: '',
        // img_cover: "",
    });

    // handle change input
    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    // handle img additional

    const getUrlFormImgAdd = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', 174989952789425);
        formData.append('upload_preset', 'iinnk03t');
        const res = await axios.post('https://api.cloudinary.com/v1_1/dd8b69mls/image/upload', formData);
        return res.data.url;
    };

    // handle add product
    const handleAddProduct = async () => {
        if (imagesAdd.length === 0) {
            swal('At lease one image in additional image', '', 'info');
            return;
        }

        // for (let index = 0; index < imagesAdd.length; index++) {
        //   const element = imagesAdd[index];
        // }
        // get url
        const formData = new FormData();
        formData.append('file', images[0].file);
        formData.append('api_key', 174989952789425);
        formData.append('upload_preset', 'iinnk03t');
        const res = await axios.post('https://api.cloudinary.com/v1_1/dd8b69mls/image/upload', formData);
        // post
        const res2 = await axios.post(`${process.env.REACT_APP_BACKEND_ROOT}/api/product/create.php`, {
            ...newProduct,
            img_cover: res.data.url,
        });
        //  update img
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        };
        for (let index = 0; index < imagesAdd.length; index++) {
            const element = imagesAdd[index];
            const url = await getUrlFormImgAdd(element.file);

            await axios.post(
                `${process.env.REACT_APP_BACKEND_ROOT}/api/imgProduct/create.php?id=${res2.data.product_id}`,
                {
                    url: url,
                },
                config
            );
        }

        swal({
            title: 'Good job!',
            text: 'You clicked the button!',
            icon: 'success',
            button: 'Aww yiss!',
        });
        navigate(`../product`);
    };
    return (
        <Wraper>
            <Box
                sx={{
                    '& > :not(style)': { m: 1 },
                    position: 'fixed',

                    right: '10px',
                    bottom: '20px',
                }}
            >
                <Fab color='primary' aria-label='edit' onClick={() => handleAddProduct()}>
                    <AddIcon />
                </Fab>
            </Box>
            <Container>
                <Heading>Add product</Heading>
                <FlexContainer>
                    <InputLeft>
                        <InputContainer>
                            <InputLabel>Name</InputLabel>
                            <Input onChange={(e) => handleChange(e)} name='name' required></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Product Code</InputLabel>
                            <Input onChange={(e) => handleChange(e)} name='product_code'></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Brand</InputLabel>
                            <Input onChange={(e) => handleChange(e)} name='brand'></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>CPU</InputLabel>
                            <Input onChange={(e) => handleChange(e)} name='cpu'></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>GPU</InputLabel>
                            <Input onChange={(e) => handleChange(e)} name='gpu'></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel htmlfor='ram'>RAM</InputLabel>
                            <Select onChange={(e) => handleChange(e)} name='ram' id='ram'>
                                <Option disabled value={''}>
                                    Select your option
                                </Option>

                                <Option value='4GB'>4GB</Option>
                                <Option value='8GB'>8GB</Option>
                                <Option value='16GB'>16GB</Option>
                            </Select>
                            {/* <Input></Input> */}
                        </InputContainer>

                        <InputContainer>
                            <InputLabel>Image Cover</InputLabel>
                            {/* <Input></Input> */}
                            <div className='App'>
                                <ImageUploading
                                    // multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey='data_url'
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        // write your building UI
                                        <div className='upload__image-wrapper'>
                                            {imageList.length > 0 || (
                                                <button
                                                    style={isDragging ? { color: 'red' } : null}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    Click or Drop here
                                                </button>
                                            )}
                                            &nbsp;
                                            {/* <button onClick={onImageRemoveAll}>
                        Remove all images
                      </button> */}
                                            {imageList.map((image, index) => (
                                                <div key={index} className='image-item'>
                                                    <img src={image.data_url} alt='' width='400' />
                                                    <div className='image-item__btn-wrapper'>
                                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                                        {/* <button onClick={() => onImageRemove(index)}>
                              Remove
                            </button> */}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </InputContainer>
                    </InputLeft>
                    <InputRight>
                        <InputContainer>
                            <InputLabel>OS</InputLabel>
                            <Input onChange={(e) => handleChange(e)} name='os'></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Price</InputLabel>
                            <Input onChange={(e) => handleChange(e)} type='number' name='price'></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Screen</InputLabel>
                            <Input onChange={(e) => handleChange(e)} name='screen'></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Size</InputLabel>
                            <Input onChange={(e) => handleChange(e)} name='size'></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Battery</InputLabel>
                            <Input onChange={(e) => handleChange(e)} name='battery'></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Amount</InputLabel>
                            <Input type='number' onChange={(e) => handleChange(e)} name='amount'></Input>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Description</InputLabel>
                            <TextArea
                                // tpye="textarea"
                                onChange={(e) => handleChange(e)}
                                name='description'
                                // height={400}
                                // maxHeight={200}
                            ></TextArea>
                        </InputContainer>
                    </InputRight>
                </FlexContainer>

                <AddImgUpload imagesAdd={imagesAdd} onChangeAdd={onChangeAdd} />
            </Container>
        </Wraper>
    );
};

export default AddProduct;
