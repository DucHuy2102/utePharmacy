import { Box, Button } from '@mui/material';
import React from 'react';
import ImageUploading from 'react-images-uploading';

const AddImgUpload = ({ imagesAdd, onChangeAdd }) => {
    return (
        <div className='mt-5'>
            <h4>Hình ảnh bổ sung</h4>
            <ImageUploading multiple value={imagesAdd} onChange={onChangeAdd} maxNumber={69} dataURLKey='data_url'>
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
                        <button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Thêm ảnh
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll}>Xóa hết ảnh</button>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                                maxWidth: '100%',
                                borderRadius: 1,
                            }}
                        >
                            {imageList.map((image, index) => (
                                <div
                                    key={index}
                                    className='image-item'
                                    style={{
                                        margin: '14px 14px',
                                        width: 250,
                                        height: 280,
                                        overflow: 'hidden',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    <img
                                        src={image['data_url']}
                                        alt=''
                                        width='250'
                                        height='250'
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className='image-item__btn-wrapper'>
                                        <Button onClick={() => onImageUpdate(index)}>Cập nhật</Button>
                                        <Button onClick={() => onImageRemove(index)}>Xóa</Button>
                                    </div>
                                </div>
                            ))}
                        </Box>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default AddImgUpload;
