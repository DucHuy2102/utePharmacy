import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import Header from './Header';
import Footer from './Footer';
import Scrollbars from 'react-scrollbars-custom';
import { MdOutlineLocationOn } from 'react-icons/md';
import { BsPhoneVibrate } from 'react-icons/bs';
import { BsPersonCircle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const { name, address, phone } = location.state;

    const [cod, setCod] = useState('bank');
    const [lstCart, setLstCart] = useState([]);

    const navigate = useNavigate();
    const onPay = () => {
        swal('Completely!', 'Payment success', 'success');
        const data = {
            user_id: sessionStorage.getItem('user_id'),
            state: 'Pending',
            total_ship: 20.0,
            date: new Date().toISOString().slice(0, 10),
            username: name,
            phone: phone,
            address: address,
            cart: lstCart,
        };
        axios
            .post(`${process.env.REACT_APP_BACKEND_ROOT}/api/order/create.php`, data)
            .then((response) => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        const data_delete = {
            user_id: sessionStorage.getItem('user_id'),
        };
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        axios
            .post(`h${process.env.REACT_APP_BACKEND_ROOT}/api/cart/deleteAll.php`, data_delete, config)
            .then((response) => {
                console.log(response.data);
            });
        navigate('../');
    };
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_ROOT}/api/cart/finditems.php?user_id=${sessionStorage.getItem(
                    'user_id'
                )}`
            )
            .then((response) => {
                if (response.data.data) setLstCart(response.data.data);
                console.log(response.data.message);
            });
    }, []);
    return (
        <div>
            <Header />
            <ContainerStyled>
                <TitleShipping>Shipping Address</TitleShipping>
                <Container fluid>
                    <Row>
                        <Col lg={8}>
                            <Line />
                            <Row>
                                <Col lg={6}>
                                    <ContainField>
                                        <Key>
                                            <MdOutlineLocationOn size={25} color='#4272D0' />
                                            <NameKey>Address:</NameKey>
                                        </Key>
                                        <Value>{address}</Value>
                                    </ContainField>
                                    <ContainField>
                                        <Key>
                                            <BsPhoneVibrate size={23} color='#4272D0' />
                                            <NameKey>Phone:</NameKey>
                                        </Key>
                                        <Value>{phone}</Value>
                                    </ContainField>
                                    <ContainField>
                                        <Key>
                                            <BsPersonCircle size={21} color='#4272D0' />
                                            <NameKey>Name:</NameKey>
                                        </Key>
                                        <Value>{name}</Value>
                                    </ContainField>
                                    <Line />
                                    <ContainerInput>
                                        <NameInput>Enter discount code</NameInput>
                                        <Input type='text' />
                                    </ContainerInput>
                                    <ButtonDiscount>Apply Discount</ButtonDiscount>
                                </Col>
                                <Col lg={6}>
                                    <ContainerInput>
                                        <NameInput>Payment methods</NameInput>
                                        <Selection id='cars' name='Bank' onChange={(e) => setCod(e.target.value)}>
                                            <Option value='bank'>Bank</Option>
                                            <Option value='delivery'>Payment on delivery</Option>
                                        </Selection>
                                    </ContainerInput>
                                    {cod === 'bank' && (
                                        <ContainerInput>
                                            <NameInput>Bank</NameInput>
                                            <Selection id='cars' name='OCB'>
                                                <Option value='OCB'>OCB</Option>
                                                <Option value='ACB'>ACB</Option>
                                                <Option value='TPBank'>TPBank</Option>
                                                <Option value='SeABank'>SeABank</Option>
                                                <Option value='Techcombank'>Techcombank</Option>
                                                <Option value='HDBank'>HDBank</Option>
                                                <Option value='Sacombank'>Sacombank</Option>
                                            </Selection>
                                        </ContainerInput>
                                    )}
                                    {cod === 'bank' && (
                                        <ContainerInput>
                                            <NameInput>Card Number</NameInput>
                                            <Input type='text' />
                                        </ContainerInput>
                                    )}
                                    {cod === 'bank' && (
                                        <ContainerInput>
                                            <NameInput>Name on Card</NameInput>
                                            <Input type='text' />
                                        </ContainerInput>
                                    )}
                                    <Row>
                                        <Col xs={8.5}>
                                            <Ship>Shipping</Ship>
                                        </Col>
                                        <Col xs={2.5}>
                                            <ValueShip>{(20).toLocaleString()}</ValueShip>
                                            {/* <ValueShip>{document.getElementById("name").value}</ValueShip> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={7}>
                                            <ButtonPay onClick={() => onPay()}>
                                                Pay $
                                                {lstCart
                                                    .reduce((sum, product) => {
                                                        return sum + product.amount * product.price;
                                                    }, 0)
                                                    .toFixed(2)}
                                            </ButtonPay>
                                        </Col>
                                        <Col md={5}>
                                            <Link to='/cart'>
                                                <ButtonBack>Back</ButtonBack>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <ContainerSummary>
                                <TitleSummary>Order Summary</TitleSummary>
                                <br />
                                <Line />
                                <Scrollbars
                                    // style={{ height: 350, marginTop: 30 }}
                                    style={Scrollbarstyled}
                                    noScrollX
                                >
                                    {lstCart.map((product) => (
                                        <StyleRow>
                                            <Row>
                                                <Col lg={3.5}>
                                                    <ContainerImg>
                                                        <ImgProduct src={product.img_cover} alt='Nothing' />
                                                    </ContainerImg>
                                                </Col>
                                                <Col lg={8.5}>
                                                    <Describe>{product.name}</Describe>
                                                    <Row>
                                                        <Col sm={4}>
                                                            <QuanPrice>Qty: {product.amount}</QuanPrice>
                                                        </Col>
                                                        <Col sm={8}>
                                                            <QuanPrice>Price: ${product.price}</QuanPrice>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </StyleRow>
                                    ))}
                                </Scrollbars>
                            </ContainerSummary>
                        </Col>
                    </Row>
                </Container>
            </ContainerStyled>
            <Footer />
        </div>
    );
};
const TitleShipping = styled.div`
    font-weight: 600;
    font-size: 1.3rem;
    padding-left: 15px;
    margin-bottom: 8px;
    margin-top: 8px;
`;
const Line = styled.hr`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 1px;
    background-color: #cacdd8;
    border-radius: 10%;
`;
const ContainField = styled.div``;
const Key = styled.div`
    font-weight: 600;
    margin-top: 10px;
    display: flex;
    align-items: center;
`;
const NameKey = styled.i`
    padding-left: 10px;
`;
const Value = styled.div`
    /* background-color: yellow; */
    margin-top: 10px;
    padding-left: 20px;
    color: #aaaaaa;
    font-size: 85%;
`;
const ContainerInput = styled.div`
    background-color: #f5f7ff;
    margin-bottom: 10px;
    border-top-right-radius: 15px;
    padding-top: 5px;
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
const Selection = styled.select`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: solid #cccccc 1px;
    padding-left: 2%;
`;

const ButtonDiscount = styled.button`
    border-radius: 20px;
    height: 35px;
    color: #0156ff;
    font-weight: 600;
    width: 100%;
    border: solid 1px #0156ff;
    cursor: pointer;
    transition: all 0.3s;
    :hover,
    :active {
        background-color: #4272d0;
        color: white;
    }
`;
const ButtonPay = styled.button`
    background-color: #0156ff;
    border-radius: 20px;
    height: 35px;
    color: white;
    font-weight: 600;
    width: 100%;
    border: solid 1px #0156ff;
    cursor: pointer;
    transition: all 0.3s;
    :hover,
    :active {
        background-color: #4272d0;
        transform: scale(1.01);
    }
    margin-top: 10px;
`;
const ButtonBack = styled.button`
    background-color: #ff0000;
    border-radius: 20px;
    height: 35px;
    color: white;
    font-weight: 600;
    width: 100%;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    :hover,
    :active {
        transform: scale(1.01);
    }
    margin-top: 10px;
`;
const Option = styled.option`
    /* background-color: red; */
    height: 10px;
    font-weight: 600;
`;
const Ship = styled.span`
    font-weight: 600;
    margin-bottom: 10px;
    padding-right: 20px;
`;
const ValueShip = styled.span`
    font-weight: 600;
`;
const ContainerSummary = styled.div`
    background-color: #f5f7ff;
    padding-top: 20px;
    padding-left: 20px;
    border-radius: 20px;
`;
const TitleSummary = styled.div`
    font-weight: 600;
    font-size: 1.2rem;
`;
const Scrollbarstyled = {
    height: '50vh',
};
const ImgProduct = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fit;
    margin-bottom: 20px;
`;
const ContainerImg = styled.div`
    /* border: solid 1px; */
    height: 90px;
    width: 90px;
    margin-bottom: 20px;
`;
const Describe = styled.div`
    display: inline;
    height: 80px;
`;
const QuanPrice = styled.div`
    font-weight: 600;
    margin-top: 30px;
`;
const StyleRow = styled.div`
    cursor: pointer;
    :hover {
        background-color: #4272d0;
        /* background-color:#CAE5E8; */
        color: white;
    }
    padding-top: 20px;
    padding-left: 10px;
    border-radius: 10px;
    transition: all 0.3s;
`;
const ContainerStyled = styled.div`
    margin-top: 30px;
`;
export default Checkout;
