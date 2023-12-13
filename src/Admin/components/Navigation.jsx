import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiFillFileAdd } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaProductHunt, FaFirstOrder } from 'react-icons/fa';
import { Container, Header, Heading, List, Item, Title, Icon } from './style.jsx';

const Navigation = ({ toogleNav, setIdOnClick }) => {
    const navigate = useNavigate();
    const getId = () => {
        const textPath = window.location.pathname.split('/')[2];
        if (textPath === '') return 0;
        if (textPath === 'product') return 1;
        if (textPath === 'customer') return 2;
        if (textPath === 'orders') return 3;
    };
    const [IdClick, setIdClick] = useState(getId());
    return (
        <Container toogle={!toogleNav}>
            <Header>
                {/* <Img
          src="https://sinhvienudn.com/wp-content/uploads/2021/04/26/admin/logo-bkhcm.png"
          alt=""
          he
        /> */}
                <Heading>UTE PHARMACY</Heading>
            </Header>

            <List>
                <Item
                    onClick={() => {
                        navigate('./');
                        setIdClick(0);
                    }}
                    color={IdClick === 0 ? 'black' : 'white'}
                >
                    <Icon>
                        <AiOutlineHome />
                    </Icon>
                    <Title>Bảng điều khiển</Title>
                </Item>
                <Item
                    onClick={() => {
                        navigate('product');
                        setIdClick(1);
                    }}
                    color={IdClick === 1 ? 'black' : 'white'}
                >
                    <Icon>
                        <FaProductHunt />
                    </Icon>
                    <Title>Sản phẩm</Title>
                </Item>
                <Item
                    onClick={() => {
                        navigate('customer');
                        setIdClick(2);
                    }}
                    color={IdClick === 2 ? 'black' : 'white'}
                >
                    <Icon>
                        <BsFillPeopleFill />
                    </Icon>
                    <Title>Khách hàng</Title>
                </Item>
                <Item
                    onClick={() => {
                        navigate('addproduct');
                        setIdClick(3);
                    }}
                    color={IdClick === 3 ? 'black' : 'white'}
                >
                    <Icon>
                        <AiFillFileAdd />
                    </Icon>
                    <Title>Thêm sản phẩm</Title>
                </Item>
                <Item
                    onClick={() => {
                        navigate('orders');
                        setIdClick(4);
                    }}
                    color={IdClick === 4 ? 'black' : 'white'}
                >
                    <Icon>
                        <FaFirstOrder />
                    </Icon>
                    <Title>Đơn hàng</Title>
                </Item>
            </List>
        </Container>
    );
};

export default Navigation;
