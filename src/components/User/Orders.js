import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import swal from 'sweetalert';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [targetTypeOrders, setTargetTypeOrders] = useState('Pending');
    const filterOrders = (state) => {
        setTargetTypeOrders(state);
    };
    const cancelOrders = (id) => {
        const data = {
            order_id: id,
            state: 'Cancelled',
        };
        console.log(data);
        axios
            .post(`${process.env.REACT_APP_BACKEND_ROOT}/api/order/cancel.php`, data)
            .then(function (response) {
                console.log(response.data);
                if (response.data.status === 'Success') {
                    swal('Completely!', 'Cancel orders success', 'success');
                    fetchOrders();
                } else {
                    alert('ko ok');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const fetchOrders = async () => {
        const id = sessionStorage.getItem('user_id');
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_ROOT}/api/order/read_single_user.php?user_id=` + id
        );
        setOrders(res.data.data);
        console.log(res.data.data);
    };
    const IsSure = (id) => {
        confirmAlert({
            title: 'Are you sure !!!',
            // message: 'Are you sure to delete !!!',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => cancelOrders(id),
                },
                {
                    label: 'No',
                    onClick: () => console.log('Ignore delete all product'),
                },
            ],
        });
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Container>
            <NavOrders>
                <TypeOrders className={targetTypeOrders === 'All' ? 'active' : ''} onClick={() => filterOrders('All')}>
                    Đơn hàng
                </TypeOrders>
                <TypeOrders
                    className={targetTypeOrders === 'Pending' ? 'active' : ''}
                    onClick={() => filterOrders('Pending')}
                >
                    Đang xử lý
                </TypeOrders>
                <TypeOrders
                    className={targetTypeOrders === 'Delivering' ? 'active' : ''}
                    onClick={() => filterOrders('Delivering')}
                >
                    Đang vận chuyển
                </TypeOrders>
                <TypeOrders
                    className={targetTypeOrders === 'Delivered' ? 'active' : ''}
                    onClick={() => filterOrders('Delivered')}
                >
                    Đã giao
                </TypeOrders>
                <TypeOrders
                    className={targetTypeOrders === 'Cancelled' ? 'active' : ''}
                    onClick={() => filterOrders('Cancelled')}
                >
                    Đã hủy
                </TypeOrders>
            </NavOrders>
            <Hr color='#b8b8b8' />
            {orders &&
                (targetTypeOrders === 'All' ? orders : orders.filter((ord) => ord.state === targetTypeOrders)).map(
                    (ord, idx) => {
                        return (
                            <Order key={idx}>
                                {ord.item.map((item, idx) => {
                                    return (
                                        <Item key={idx}>
                                            <Image>
                                                <img
                                                    src={item.img_cover}
                                                    alt='item'
                                                    style={{ width: 'auto', height: '100%' }}
                                                />
                                            </Image>
                                            <Detail>
                                                <Name>{item.name}</Name>
                                                <Desc>{item.description}</Desc>
                                                <Price>${item.price}</Price>
                                                <Qty>x{item.amount}</Qty>
                                                <Price fw='bold'>${item.price * item.amount}</Price>
                                            </Detail>
                                        </Item>
                                    );
                                })}
                                <Text style={{ textAlign: 'right' }}>Delivery cost: ${ord.total_ship}</Text>
                                <Hr />
                                <Total>
                                    <Text className='time'>Date: {ord.date}</Text>
                                    <Text className='total'>
                                        Total: ${Math.round((ord.total + ord.total_ship) * 100) / 100}
                                    </Text>
                                </Total>
                                {ord.state === 'Pending' && (
                                    <div style={{ textAlign: 'right' }} onClick={() => IsSure(ord.order_id)}>
                                        <CancelBtn>Cancel</CancelBtn>
                                    </div>
                                )}
                            </Order>
                        );
                    }
                )}
        </Container>
    );
};

const CancelBtn = styled.button`
    width: 100px;
    background-color: white;
    border-color: gray;
    color: gray;
    border-width: 1px;
    border-radius: 5px;
`;
const Text = styled.p`
    margin: 0px;
    font-size: 14px;
`;
const Name = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 14px;
    @media (max-width: 480px) {
        font-size: 16px;
        font-weight: 400;
    }
`;
const Detail = styled.div`
    width: 85%;
    box-sizing: border-box;
    padding-left: 10px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
`;
const Total = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .time {
        color: gray;
    }
    .total {
        font-weight: bold;
        font-size: 18px;
        @media (max-width: 480px) {
            font-size: 16px;
        }
    }
`;
const Qty = styled.div`
    width: 50px;
    text-align: center;
    background-color: #f5f7ff;
    height: fit-content;
    margin: 0 auto;
    padding: 10px 0;
    border-radius: 5px;
    color: gray;
    font-size: 13px;
`;
const Price = styled.span`
    font-weight: ${(props) => (props.fw ? props.fw : '')};
    flex: 1;
    padding-top: 10px;
    font-size: 14px;
    text-align: ${(props) => (props.fw ? 'right' : 'center')};
    color: gray;
    @media (max-width: 480px) {
        text-align: ${(props) => (props.fw ? 'right' : 'left')};
    }
`;
const Desc = styled.span`
    width: 35%;
    height: 80%;
    overflow: hidden;
    padding-top: 10px;
    font-size: 13px;
    @media (max-width: 480px) {
        display: none;
    }
`;
const Image = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 15%;
`;
const Item = styled.div`
    display: flex;
    flex-direction: row;
    height: 120px;
    width: 100%;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        height: 100px;
    }
    @media (max-width: 480px) {
        height: 80px;
    }
`;
const Order = styled.div`
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const TypeOrders = styled.div`
    color: gray;
    text-align: center;
    padding: 5px 10px;
    width: 150px;
    cursor: pointer;
    &.active {
        border-bottom: 4px solid #0156ff;
    }
`;
const NavOrders = styled.div`
    display: flex;
    flex-direction: row;
    overflow: scroll;
    width: 100%;
    &::-webkit-scrollbar {
        height: 5px;
        display: none;
    }
    /* Track */
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 3px;
    }
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #757575;
    }
`;
const Hr = styled.hr`
    border: 0;
    height: 0.2px;
    margin: 0px;
    background-image: -webkit-linear-gradient(gray, gray, gray);
`;
const Container = styled.div`
    padding: 0;
    width: 100%;
`;

export default Orders;
