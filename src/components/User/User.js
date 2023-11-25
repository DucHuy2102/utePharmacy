import React, { useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import styled from 'styled-components';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import Orders from './Orders';
import Wishlist from './Wishlist';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Information from './Information';
import Password from './Password';
import { Navigate } from 'react-router-dom';

const User = () => {
    const [targetNavItem, setTargetNavItem] = useState('my-account');
    const [targetNavChildItem, setTargetNavChildItem] = useState('infor');

    const [isEnabled, setIsEnabled] = useState(false);
    const changeNavItem = (item) => {
        if (item !== 'my-account') {
            setTargetNavChildItem('');
        } else {
            setTargetNavChildItem('infor');
        }
        setTargetNavItem(item);
        setIsEnabled(false);
    };
    const changeNavChildItem = (item) => {
        setTargetNavChildItem(item);
        setTargetNavItem('my-account');
        setIsEnabled(false);
    };

    return (
        <>
            {!sessionStorage.getItem('user_id') && <Navigate to='/login' replace={true} />}
            <Header />
            <Container>
                <Head onClick={() => setIsEnabled(!isEnabled)}>
                    <Breadcrumbs className='breadcrumbs' separator='›' maxItems={2} aria-label='breadcrumb'>
                        <Link underline='hover' color='inherit' href='/'>
                            Trang chủ
                        </Link>
                        <Typography color='text.primary'>Tài khoản của tôi</Typography>
                    </Breadcrumbs>
                    <h2 style={{ marginTop: '10px' }}>
                        {targetNavItem === 'my-account'
                            ? 'My Account'
                            : targetNavItem === 'my-orders'
                            ? 'My Orders'
                            : 'My Wishlist'}
                    </h2>
                    <ArrowDropDownIcon className='dropdown-icon' />
                </Head>
                <Row>
                    <NavBox disp={isEnabled}>
                        <NavItem
                            className={targetNavItem === 'my-account' ? 'active' : ''}
                            onClick={() => changeNavItem('my-account')}
                        >
                            Tài khoản của tôi
                        </NavItem>
                        <NavChildItem
                            className={targetNavChildItem === 'infor' ? 'active' : ''}
                            onClick={() => changeNavChildItem('infor')}
                        >
                            Thông tin tài khoản
                        </NavChildItem>
                        <NavChildItem
                            className={targetNavChildItem === 'change-pass' ? 'active' : ''}
                            onClick={() => changeNavChildItem('change-pass')}
                        >
                            Đổi mật khẩu
                        </NavChildItem>
                        <NavItem
                            className={targetNavItem === 'my-orders' ? 'active' : ''}
                            onClick={() => changeNavItem('my-orders')}
                        >
                            Đơn hàng của tôi
                        </NavItem>
                        <Hr />
                        <NavItem
                            className={targetNavItem === 'my-wishlist' ? 'active' : ''}
                            onClick={() => changeNavItem('my-wishlist')}
                        >
                            Giỏ hàng yêu thích
                        </NavItem>
                    </NavBox>
                    <Content>
                        {targetNavItem === 'my-orders' && <Orders />}
                        {targetNavItem === 'my-wishlist' && <Wishlist wishlist={[]} />}
                        {targetNavChildItem === 'infor' && <Information />}
                        {targetNavChildItem === 'change-pass' && <Password />}
                    </Content>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

const Content = styled.div`
    width: 75%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    min-height: 400px;
    @media (max-width: 1024px) {
        width: 79%;
        margin-left: 1%;
    }
    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
    }
`;
const Hr = styled.hr`
    margin: 0px;
    margin-left: 15px;
    border: 0;
    height: 0.2px;
    background-image: -webkit-linear-gradient(#d6d6d6, #d6d6d6, #d6d6d6);
`;
const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
const NavChildItem = styled.div`
    padding: 10px 0;
    margin-left: 30px;
    cursor: pointer;
    &.active {
        color: #0156ff;
    }
`;
const NavItem = styled.div`
    padding: 10px 0;
    padding-left: 15px;
    cursor: pointer;
    &.active {
        border-left: 3px solid #0156ff;
    }
`;
const NavBox = styled.div`
    color: gray;
    background-color: #f5f7ff;
    width: 20%;
    padding: 5px 15px 5px 0;
    height: fit-content;
    @media (max-width: 768px) {
        display: ${(props) => (props.disp ? '' : 'none')};
        width: 100%;
    }
`;
const Head = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    & .breadcrumbs {
        @media (max-width: 768px) {
            display: none;
        }
    }
    & .dropdown-icon {
        display: none;
        @media (max-width: 768px) {
            display: block;
        }
    }
    @media (max-width: 768px) {
        padding: 5px 0;
        border-bottom: 1px solid #e1e1e1;
        flex-direction: row;
        align-items: center;
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    @media (max-width: 1024px) {
        width: 98%;
    }
`;

export default User;
