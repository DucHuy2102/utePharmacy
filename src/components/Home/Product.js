import { Rating } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { grey } from '@mui/material/colors';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

const Product = (props) => {
    const addToWishlist = (e) => {
        alert('Đã thêm vào wish list của bạn');
    };

    const product = props.product;
    return (
        <Container key={props.idx} display={props.display} onClick={() => props.onClick(product.product_id)}>
            {product.amount > 0 ? (
                <Status display={props.display}>
                    <i className='fa fa-check-circle' aria-hidden='true'></i> Còn hàng
                </Status>
            ) : (
                <Status display={props.display} color='#cf2115'>
                    <i className='fa fa-check-circle' aria-hidden='true'></i> Hết hàng
                </Status>
            )}
            <Box display={props.display}>
                <div>
                    <Image display={props.display}>
                        <img src={product.img_cover} style={{ maxWidth: '100%', maxHeight: '100%' }} alt='laptop' />
                    </Image>
                    <Rate display={props.display}>
                        <Rating size='small' name='read-only' value={product.rating} readOnly />
                        <Text style={{ fontSize: '13px', color: '#a6a6a6' }}>Reviews ({product.num_reviewer})</Text>
                    </Rate>
                </div>
                <div className='detail'>
                    <Name display={props.display}>{product.name}</Name>
                    {props.display === 1 && <Desc>{product.description}</Desc>}
                    <Box display={props.display}>
                        <Text style={{ color: 'gray', marginRight: '10px' }}>
                            <s>{product.old_price + 'đ/Hộp'}</s>
                        </Text>
                        <Text style={{ fontSize: '20px' }}>
                            <b>{product.price + 'đ/Hộp'}</b>
                        </Text>
                    </Box>
                    {props.display === 1 && (
                        <ComboBtn>
                            <Button text='Add to cart' type='primary sm' />
                            <FavoriteTwoToneIcon sx={{ color: grey[500] }} onClick={(e) => addToWishlist(e)} />
                        </ComboBtn>
                    )}
                </div>
            </Box>
        </Container>
    );
};

const Text = styled.span`
    margin: 0;
    padding: 0;
`;

const ComboBtn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Desc = styled.span`
    width: 100%;
    font-size: 13px;
    max-height: 100px;
    overflow: hidden;
`;
const Box = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.display === 0 ? 'column' : 'row')};
    .detail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;
const Name = styled.div`
    font-size: 14px;
    font-weight: 400;
    height: ${(props) => (props.display ? '30px' : '40px')};
    overflow: hidden;
`;
const Rate = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${(props) => (props.display ? '0 10px' : '')};
`;

const Status = styled.div`
    text-align: ${(props) => (props.display === 0 ? 'left' : 'right')};
    color: ${(props) => (props.color ? props.color : '#78A962')};
    font-size: 13px;
`;
const Image = styled.div`
    width: ${(props) => (props.display === 0 ? 'auto' : '200px')};
    height: 150px;
    display: flex;
    justify-content: center;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: ${(props) => (props.display === 0 ? '20%' : '100%')};
    max-height: 300px;
    margin-bottom: 5px;
    box-shadow: ${(props) =>
        props.display === 1 ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;'};
    :hover {
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    @media (max-width: 1080px) {
        width: ${(props) => (props.display === 0 ? '25%' : '100%')};
    }
    @media (max-width: 768px) {
        width: ${(props) => (props.display === 0 ? '33%' : '100%')};
    }
    @media (max-width: 480px) {
        width: ${(props) => (props.display === 0 ? '50%' : '100%')};
    }
`;
export default Product;
