import { Box, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import ReactImageUploading from 'react-images-uploading';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { createImg } from '../../store/reducers/productsSlice';

const ImgUpload = ({ idProduct }) => {
    // redux
    // redux
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };
    const handleAddImg = async () => {
        const formData = new FormData();
        formData.append('file', images[0].file);
        formData.append('api_key', 174989952789425);
        formData.append('upload_preset', 'iinnk03t');
        const res = await axios.post('https://api.cloudinary.com/v1_1/dd8b69mls/image/upload', formData);
        dispatch(createImg({ id: idProduct, url: res.data.url }));
        swal('Good job!', 'Đã thêm ảnh', 'success');
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 80px',
            }}
        >
            <div>
                <ReactImageUploading
                    multiple
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
                        <div className='upload__image-wrapper'>
                            <button
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Thêm ảnh
                            </button>
                            &nbsp;
                            <button onClick={onImageRemoveAll}>Xóa hết ảnh</button>
                            {imageList.map((image, index) => (
                                <div key={index} className='image-item'>
                                    <img src={image['data_url']} alt='' width='400' />
                                    <div className='image-item__btn-wrapper'>
                                        <button onClick={() => onImageUpdate(index)}>Lưu</button>
                                        <button onClick={() => onImageRemove(index)}>Xóa</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ReactImageUploading>
            </div>
            <Button variant='contained' color='success' onClick={() => handleAddImg()}>
                Add
            </Button>
        </Box>
    );
};

export default ImgUpload;
