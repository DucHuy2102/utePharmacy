import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ordersSelector, getAllOrder } from '../store/reducers/ordersSlice';
import { useEffect } from 'react';

const MainContentWrap = styled.div`
    display: flex;
    /* margin-top: 50px; */
    gap: 20px;
    flex-wrap: wrap;
`;
const Orders = styled.div`
    box-shadow: 0px 0px 6px #b2b2b2;
    flex: 3;
    padding: 10px 20px;
    border-radius: 8px;
    background-color: white;
    @media (max-width: 1024px) {
        flex: none;
        width: 100%;
    }
    /* @media (max-width: 600px) {
    width: 99%;
  } */
`;
const Custommers = styled.div`
    box-shadow: 0px 0px 6px #b2b2b2;
    padding: 10px 20px;
    border-radius: 8px;
    margin-right: 10px;
    background-color: white;
    flex: 2;
`;
const OrderHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;
const OrderContent = styled.div``;
const OrderHeaderTitle = styled.h3`
    font-size: 20px;
    color: #297bff;
    font-weight: 700;
`;
const CustomerHeader = styled.h3`
    font-size: 20px;
    color: #297bff;
    font-weight: 700;
`;
const OrderHeaderBtn = styled.button`
    color: while;
    background-color: #297bff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0px 0px 6px #b2b2b2;
    cursor: pointer;
    padding: 4px 6px;
    text-align: center;
    color: white;
`;
const Table = styled.table`
    width: 100%;
    margin-top: 28px;
    border-collapse: collapse;
`;
const Tr = styled.tr`
    margin: 2px 0;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const Th = styled.th`
    text-align: ${(props) => props.position};
    font-size: 18px;
    font-weight: 700;
    /* padding: 0 8px; */
`;
const Td = styled.td`
    text-align: ${(props) => props.position};
    padding: 8px 0;
    &:nth-child(2) {
        text-align: right;
    }
    &:nth-child(3) {
        text-align: center;
    }
    &:nth-child(4) {
        text-align: right;
    }
`;
const CustomerList = styled.div`
    margin-top: 20px;
`;
const CustomerCountry = styled.h4`
    font-size: 16px;
    font-weight: 400;
    color: #ccc;
`;
const Span = styled.span`
    background-color: ${(props) => props.color};
    padding: 3px;
    border-radius: 2px;
    color: white;
`;
const CustomerItem = styled.div`
    padding: 8px 12px;
    margin: 8px 0;
    display: flex;
    cursor: pointer;
    justify-content: flex-start;
    &:hover {
        background-color: #297bff;
        color: white;
        ${CustomerCountry} {
            color: white;
        }
    }
`;
const CustomerImg = styled.img`
    height: 40px;
    width: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 20px;
`;
const CustomerRight = styled.div``;
const CustomerName = styled.h4`
    font-size: 18px;
`;

const MainContent = () => {
    const navigate = useNavigate();
    const allOrder = useSelector(ordersSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch]);
    return (
        <MainContentWrap>
            <Orders>
                <OrderHeader>
                    <OrderHeaderTitle>Đơn hàng gần đây</OrderHeaderTitle>
                    <OrderHeaderBtn onClick={() => navigate('orders')}>Xem tất cả</OrderHeaderBtn>
                </OrderHeader>
                <OrderContent>
                    <Table>
                        <tbody>
                            <Tr>
                                <Th position='left'>Tên khách hàng</Th>
                                <Th position='right'>Giá bán</Th>
                                <Th position='center'>Phí vận chuyển</Th>
                                <Th position='right'>Tình trạng</Th>
                            </Tr>

                            {allOrder.map((order) => {
                                return (
                                    <Tr>
                                        <Td>{order.name}</Td>
                                        <Td>{order.total}</Td>
                                        <Td>{order.total_ship}</Td>
                                        <Td>
                                            <Span style={{ marginLeft: '-12px' }} src='' color='green'>
                                                {order.state}
                                            </Span>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </OrderContent>
            </Orders>
            <Custommers>
                <CustomerHeader>Khách hàng gần đây</CustomerHeader>
                <CustomerList>
                    {allOrder.slice(0, 5).map((order) => {
                        return (
                            <CustomerItem>
                                <CustomerImg src='https://res.cloudinary.com/dd8b69mls/image/upload/v1654857710/bmbahavxcxzrgkjrdrob.jpg'></CustomerImg>
                                <CustomerRight>
                                    <CustomerName>{order.name}</CustomerName>
                                    <CustomerCountry>Việt Nam</CustomerCountry>
                                </CustomerRight>
                            </CustomerItem>
                        );
                    })}
                </CustomerList>
            </Custommers>
        </MainContentWrap>
    );
};

export default MainContent;
