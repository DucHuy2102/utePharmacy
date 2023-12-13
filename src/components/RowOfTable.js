import styled from 'styled-components';
import { Row, Col } from 'react-grid-system';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { subCart } from '../store/reducers/numCartSlice';

const RowOfTable = (props) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(props.product.amount);
    const createNotification = (type) => {
        switch (type) {
            case 'notavailable':
                NotificationManager.warning(`This product is available ${props.product.available}`, 'Error !!!', 2000);
                break;
            default:
                break;
        }
    };
    const incrementCount = (id) => {
        if (count + 1 > props.product.available) {
            createNotification('notavailable');
            return;
        }
        props.setTotal((Number(props.total) + Number(props.product.price)).toFixed(2));
        const data = {
            user_id: sessionStorage.getItem('user_id'),
            product_id: props.product.product_id,
            amount: count + 1,
        };
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        axios
            .post(`${process.env.REACT_APP_BACKEND_ROOT}/api/cart/updateitems.php`, data, config)
            .then((response) => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        setCount(count + 1);
    };
    const decrementCount = () => {
        console.log('Run here');
        if (count > 1) {
            props.setTotal((Number(props.total) - Number(props.product.price)).toFixed(2));
            const data = {
                user_id: sessionStorage.getItem('user_id'),
                product_id: props.product.product_id,
                amount: count - 1,
            };
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            axios
                .post('http://localhost/ecommerce/backend/api/cart/updateitems.php', data, config)
                .then((response) => {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

            setCount(count - 1);
        } else {
            IsSure('Xóa sản phẩm !!!', () => Delete(), 'Ignore delete one');
        }
    };
    const Delete = () => {
        props.setTotal((Number(props.total) - Number(props.product.price) * Number(count)).toFixed(2));
        const data = {
            user_id: sessionStorage.getItem('user_id'),
            product_id: props.product.product_id,
        };
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        setCount(0);
        axios
            .post('http://localhost/ecommerce/backend/api/cart/delete.php', data, config)
            .then((response) => {
                console.log(response.data);
                dispatch(subCart());
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const IsSure = (title, dispath, log) => {
        confirmAlert({
            title: title,
            // message: 'Are you sure to delete !!!',
            buttons: [
                {
                    label: 'Đồng ý',
                    onClick: () => dispath(),
                },
                {
                    label: 'Không',
                    onClick: () => console.log(log),
                },
            ],
        });
    };
    if (count <= 0) {
        return <></>;
    }
    return (
        <div>
            <HoverRow>
                <NotificationContainer />
                <Row style={RowTable}>
                    <Col md={7} sm={3} xs={3}>
                        <Row>
                            <Col sm={2.5}>
                                <ContainerImg>
                                    <ImgProduct src={props.product.img_cover} alt='Image product' />
                                </ContainerImg>
                            </Col>
                            <ColResponesive sm={9.5}>
                                <Describe>
                                    {props.product.name + ' ' + props.product.cpu + ' ' + props.product.screen}
                                </Describe>
                            </ColResponesive>
                        </Row>
                    </Col>
                    <Col md={2} sm={3} xs={3}>
                        {props.product.price}đ
                    </Col>
                    <Col md={1.2} sm={2.2} xs={2.2}>
                        <div style={ArrowIcon}>
                            {count}
                            <Arrow>
                                <ArrowUp>
                                    <MdKeyboardArrowUp onClick={() => incrementCount(props.product.product_id)} />
                                </ArrowUp>
                                <ArrowDown>
                                    <MdKeyboardArrowDown onClick={() => decrementCount()} />
                                </ArrowDown>
                            </Arrow>
                        </div>
                    </Col>
                    <CloseResponesive md={1.8} sm={2.8} xs={2.8}>
                        {/* {props.product.subtotal.toLocaleString()} */}
                        {(props.product.price * count).toFixed(2)}
                        <Close>
                            <AiOutlineCloseCircle
                                size={18}
                                color='#888888'
                                onClick={() => IsSure('Xóa sản phẩm !!!', () => Delete(), 'Ignore delete one')}
                            />
                        </Close>
                    </CloseResponesive>
                </Row>
            </HoverRow>
            <Line />
        </div>
    );
};
const ContainerImg = styled.div`
    /* border: solid 1px red; */
    height: 90px;
    width: 90px;
`;
const Close = styled.div`
    position: absolute;
    right: 20px;
    top: 0;
    cursor: pointer;
    transition: all 0.3s;
    :hover {
        color: black;
        transform: scale(1.1);
    }
    margin-left: 10px;
`;
const Line = styled.hr`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 1px;
    background-color: #cacdd8;
    border-radius: 10%;
`;
const ImgProduct = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fit;
`;
const Describe = styled.div`
    display: inline;
`;
const HoverRow = styled.div`
    transition: all 0.3s;
    &:hover {
        background-color: #eeeeee;
    }
    cursor: pointer;
`;
const RowTable = {
    height: '100px',
    display: 'flex',
    alignItems: 'center',
};
const ArrowIcon = {
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    // backgroundColor: "red",
    border: 'solid 1px #DDDDDD',
    paddingLeft: '10px',
    // paddingTop: "2px",
    // paddingBottom: "2px",
    borderRadius: '5px',
    width: '50px',
};
const Arrow = styled.span`
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    text-align: center;
    align-items: center;
    border-radius: 5px;
    /* background-color: red; */
`;

const ArrowUp = styled.span`
    color: #a2a6b0;
    /* margin-bottom: 0px; */
    cursor: 'pointer';
    transition: all 0.3s;
    :hover {
        transform: scale(1.1);
        color: #0066ff;
    }
`;

const ArrowDown = styled.i`
    color: #a2a6b0;
    cursor: 'pointer';
    transition: all 0.3s;
    :hover {
        transform: scale(1.3);
        color: #0066ff;
    }
`;
const ColResponesive = styled(Col)`
    @media (max-width: 780px) {
        display: none;
    }
`;
const CloseResponesive = styled(Col)`
    @media (max-width: 480px) {
        display: none;
    }
`;

export default RowOfTable;
