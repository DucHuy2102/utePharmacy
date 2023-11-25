import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Scrollbars from 'react-scrollbars-custom';
import RowOfTable from './RowOfTable';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './CartItem.css';

const Cart = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const createNotification = (type) => {
        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('Success message', 'Title here');
                break;
            case 'warning':
                NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                break;
            case 'errorName':
                NotificationManager.warning('Tên người dùng chỉ chứa 3 - 14 ký tự', 'Lỗi tên người dùng!', 3000);
                break;
            case 'errorPhone':
                NotificationManager.error('Số điện thoại chỉ chứa số', 'Lỗi số điện thoại!', 3000);
                break;
            case 'errorAddress':
                NotificationManager.warning('Địa chỉ chỉ chứa 3 - 30 ký tự', 'Lỗi địa chỉ!', 3000);
                break;
            case 'noItems':
                NotificationManager.warning('Không có sản phẩm trong giỏ hàng', 'Giỏ hàng trống !!!', 2000);
                break;
            default:
                break;
        }
    };
    const IsSure = () => {
        confirmAlert({
            title: 'Xóa tất cả đơn hàng !',
            // message: 'Xóa tất cả đơn hàng !!!',
            buttons: [
                {
                    label: 'Đồng ý',
                    onClick: () => ClearAll(),
                    className: 'btnYes',
                },
                {
                    label: 'Không',
                    onClick: () => console.log('Ignore delete all product'),
                    className: 'btnNo',
                },
            ],
        });
    };
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_ROOT}/api/cart/finditems.php?user_id=${sessionStorage.getItem(
                    'user_id'
                )}`
            )
            .then((response) => {
                if (response.data.data) setCart(response.data.data);
                setTotal(
                    response.data.data
                        .reduce((sum, product) => {
                            return sum + product.amount * product.price;
                        }, 0)
                        .toFixed(2)
                );
                console.log(response.data.message);
            });
    }, []);
    const ContainerNotification = (name, phone, address) => {
        if (cart.length === 0) {
            createNotification('noItems');
            return;
        }
        if (name.length < 3 || name.length > 14) {
            createNotification('errorName');
            return;
        }
        if (!Number(phone)) {
            createNotification('errorPhone');
            return;
        }
        if (address.length < 3 || address.length > 30) {
            createNotification('errorAddress');
            return;
        }
    };
    const ClearAll = () => {
        setCart([]);
        setTotal(0);
        const data = {
            user_id: sessionStorage.getItem('user_id'),
        };
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        axios.post('http://localhost/ecommerce/backend/api/cart/deleteAll.php', data, config).then((response) => {
            console.log(response.data);
        });
    };
    return (
        <div>
            <Header />
            <ContainerStyled fluid>
                <Row>
                    <Col xl={7.5}>
                        <Title className='tittleCart'>Giỏ hàng</Title>
                        <Row style={RowHeader}>
                            <Col md={7} sm={3} xs={3}>
                                Thông tin sản phẩm
                            </Col>
                            <Col md={2} sm={3} xs={3}>
                                Giá tiền
                            </Col>
                            <Col md={1} sm={2} xs={2}>
                                Đơn vị
                            </Col>
                            <CloseResponesive md={2} sm={3} xs={3}>
                                Thành tiền
                            </CloseResponesive>
                        </Row>
                        <Line />
                        <Scrollbars style={Scrollbarstyled} noScrollX>
                            {cart.length !== 0 ? (
                                cart.map((product) => (
                                    <RowOfTable
                                        key={product.product_id}
                                        product={product}
                                        cart={cart}
                                        total={total}
                                        setTotal={setTotal}
                                    />
                                ))
                            ) : (
                                <NoItemInCart>( Không có sản phẩm trong giỏ hàng )</NoItemInCart>
                            )}
                        </Scrollbars>
                        <Row>
                            <Col sm={6}>
                                <ButtonContinue onClick={() => navigate(-1)}>Trang chủ</ButtonContinue>
                            </Col>
                            <Col sm={6}>
                                <ButtonClear onClick={() => IsSure()}>Xóa giỏ hàng</ButtonClear>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={4} style={ContainerSummary}>
                        <Title style={{ display: 'flex', justifyContent: 'center' }}>Hóa đơn</Title>
                        <ContainerInput>
                            <NameInput>Tên người dùng:</NameInput>
                            <Input type='text' onChange={(e) => setName(e.target.value)} />
                        </ContainerInput>
                        <ContainerInput>
                            <NameInput>Số điện thoại:</NameInput>
                            <Input type='text' onChange={(e) => setPhone(e.target.value)} />
                        </ContainerInput>
                        <ContainerInput>
                            <NameInput>Địa chỉ:</NameInput>
                            <Input type='text' onChange={(e) => setAddress(e.target.value)} />
                        </ContainerInput>
                        <Line />
                        <Row>
                            <Col sm={8.5} xs={8.5}>
                                <Ship>Chi phí vận chuyển:</Ship>
                            </Col>
                            <Col sm={2.5} xs={2.5}>
                                <ValueShip>{(10.07).toLocaleString()}</ValueShip>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col sm={8.5} xs={8.5}>
                                <Ship>Tổng chi phí:</Ship>
                            </Col>
                            <Col sm={2.5} xs={2.5}>
                                <ValueShip>${total}</ValueShip>
                            </Col>
                        </Row>
                        <br />
                        <Link
                            to='/checkout'
                            style={LinkStyle}
                            state={{
                                name: name,
                                address: address,
                                phone: phone,
                            }}
                        >
                            {name.length >= 3 &&
                                name.length <= 14 &&
                                address.length >= 3 &&
                                address.length <= 30 &&
                                cart.length !== 0 &&
                                !/\D/.test(phone) && <ButtonCheckout>Proceed to Checkout</ButtonCheckout>}
                        </Link>
                        {!(
                            name.length >= 3 &&
                            name.length <= 14 &&
                            address.length >= 3 &&
                            address.length <= 30 &&
                            cart.length !== 0 &&
                            !/\D/.test(phone)
                        ) && (
                            <ButtonFill onClick={() => ContainerNotification(name, phone, address)}>
                                Gửi thông tin
                            </ButtonFill>
                        )}
                        <NotificationContainer />
                        {name.length >= 3 &&
                            name.length <= 14 &&
                            address.length >= 3 &&
                            address.length <= 30 &&
                            !/\D/.test(phone) && <ButtonMultiple>Checkout with Multiple Address</ButtonMultiple>}
                    </Col>
                </Row>
            </ContainerStyled>
            <Footer />
        </div>
    );
};
const Title = styled.div`
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 15px;
`;
const ButtonContinue = styled.button`
    border-radius: 20px;
    width: 180px;
    height: 40px;
    margin-top: 30px;
    transition: all 0.3s;
    border: solid #cccccc;
    :hover {
        cursor: pointer;
        background-color: #6c757d;
        color: white;
    }
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
`;
const ButtonClear = styled.button`
    border-radius: 20px;
    width: 180px;
    height: 40px;
    margin-top: 30px;
    color: white;
    background-color: #111111;
    transition: all 0.3s;
    border: solid #222222;
    :hover {
        background-color: #000000;
        cursor: pointer;
        /* transform: scale(1.01); */
    }
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
`;
const Line = styled.hr`
    /* margin-top: 10px; */
    margin-bottom: 10px;
    width: 100%;
    height: 1px;
    background-color: #cacdd8;
    border-radius: 10%;
`;
const ContainerInput = styled.div`
    background-color: rgb(98, 147, 219);
    margin-bottom: 10px;
`;
const NameInput = styled.div`
    font-weight: 600;
    margin-bottom: 10px;
`;
const Input = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: solid #cccccc 1px;
    padding-left: 2%;
`;
const Scrollbarstyled = {
    height: '47vh',
};

const RowHeader = {
    fontSide: '120%',
    fontWeight: '600',
    marginBottom: '10px',
};
const ContainerSummary = {
    backgroundColor: '#6293db',
    borderRadius: '10px',
};
const Ship = styled.span`
    font-weight: 600;
    margin-bottom: 10px;
    padding-right: 20px;
`;
const ValueShip = styled.span`
    font-weight: 600;
`;
const ButtonCheckout = styled.button`
    border-radius: 20px;
    background-color: #0156ff;
    color: #ffffff;
    font-weight: 600;
    display: block;
    height: 40px;
    width: 100%;
    border: none;
    transition: all 0.5s;
    :hover,
    :active {
        background-color: #0043c8;
    }
    margin-bottom: 20px;
    cursor: pointer;
    :disabled {
        background-color: #444444;
    }
`;
const ButtonMultiple = styled.button`
    border-radius: 20px;
    background-color: #ffb800;
    color: #ffffff;
    font-weight: 600;
    display: block;
    height: 40px;
    width: 100%;
    border: none;
    transition: all 0.5s;
    :hover,
    :active {
        background-color: #c0ac7b;
    }
    margin-bottom: 10px;
    cursor: pointer;
`;
const ButtonFill = styled.button`
    border-radius: 20px;
    background-color: white;
    font-weight: 600;
    display: block;
    height: 40px;
    width: 100%;
    border: none;
    transition: all 0.5s;
    :hover,
    :active {
        background-color: #6c757d;
        color: white;
    }
    margin-bottom: 10px;
    cursor: pointer;
`;
const LinkStyle = {
    textDecoration: 'none',
};
const ContainerStyled = styled(Container)`
    margin-top: 40px;
`;
const CloseResponesive = styled(Col)`
    @media (max-width: 480px) {
        display: none;
    }
`;
const NoItemInCart = styled.h2`
    font-style: italic;
    font-size: 30px;
    text-align: center;
    margin-top: 30px;
`;
export default Cart;
