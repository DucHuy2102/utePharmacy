import React from 'react';
import styled from 'styled-components';
import { ShoppingCart, Person } from '@mui/icons-material';
import { Navbar, Container, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNumCart, numCartSelector } from '../store/reducers/numCartSlice';
import './Header.css';

const Header = (props) => {
    const numCart = useSelector(numCartSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNumCart());
    }, [dispatch]);
    const signout = () => {
        sessionStorage.clear();
    };
    const [user, setUser] = useState(null);
    const [searchVal, setSearchVal] = useState('');
    const searchProduct = (e) => {
        if (e.code === 'Enter') {
            const filteredProduct = props.data.filter((p) =>
                p.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            props.setcurrPage(1);
            props.setfilteredProducts(filteredProduct);
            props.getProductPerPage(filteredProduct);
            props.setcountPage(Math.ceil(filteredProduct.length / props.num));
        }
    };
    useEffect(() => {
        const data = sessionStorage.getItem('user_id');
        if (data) {
            setUser(data);
        }
    }, [props.data]);
    return (
        <>
            <Navbar
                collapseOnSelect
                expand='lg'
                variant='dark'
                style={{ backgroundColor: '#2167dd', fontSize: '18px' }}
            >
                <Container>
                    <Navbar.Brand as={Link} to='/' className='d-flex flex-row align-items-center gap-2'>
                        <img
                            src={require('./images/logo_UTE.png')}
                            alt='Logo HCMUTE'
                            width='60'
                            height='60'
                            className='d-inline-block align-top'
                        />
                        <Title
                            style={{
                                marginBottom: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: '5px',
                            }}
                        >
                            <span style={{ lineHeight: '25px', letterSpacing: '2px' }}>UTE</span>
                            <span style={{ fontSize: '20px', lineHeight: '20px' }}>Pharmacy</span>
                        </Title>
                    </Navbar.Brand>

                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <SearchBar className='searchbar'>
                            <SearchButton style={{ backgroundColor: 'white' }}>
                                <i className='fa fa-search'></i>
                            </SearchButton>
                            <SearchInput
                                type='text'
                                name='search_product'
                                id='search_product'
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                placeholder='Tìm kiếm thuốc . . .'
                                onKeyUp={(e) => searchProduct(e)}
                            />
                        </SearchBar>

                        <Nav className='me-auto'></Nav>

                        <Nav style={{ marginRight: '20px' }}>
                            <Nav.Link as={Link} to='/news' style={{ color: 'white' }}>
                                Góc sức khỏe
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    <NavIcon>
                        <div style={{ marginLeft: 'auto', minWidth: '60px' }}>
                            <Link style={{ textDecoration: 'none' }} to='/cart'>
                                <CartIcon />
                                <CartCounter>{numCart}</CartCounter>
                            </Link>
                        </div>

                        <Dropdown>
                            <Dropdown.Toggle style={{ backgroundColor: 'transparent', border: 'none' }}>
                                <UserIcon></UserIcon>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ zIndex: '9999', border: '0.1px solid black' }}>
                                {user ? (
                                    <>
                                        <Dropdown.Item
                                            as={Link}
                                            to='/user'
                                            style={{ border: 'none', outline: 'none', height: '100%' }}
                                        >
                                            Tài khoản của tôi
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={signout} href='/login'>
                                            Đăng xuất
                                        </Dropdown.Item>
                                    </>
                                ) : (
                                    <>
                                        <Dropdown.Item as={Link} to='/login'>
                                            Đăng nhập
                                        </Dropdown.Item>

                                        <Dropdown.Item as={Link} to='/login'>
                                            Đăng ký
                                        </Dropdown.Item>
                                    </>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </NavIcon>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                </Container>
            </Navbar>
        </>
    );
};

const Title = styled.p`
    color: white;
    font-size: 30px;
    font-weight: 900;
    font-family: 'Montserrat';
    font-style: normal;
    @media (max-width: 480px) {
        display: none;
    }
`;
const SearchBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    border: none;
    border-radius: 15px;
    padding: 5px 15px;
    max-width: 250px;
    /* @media (max-width: 768px){
    display: none;
  } */
`;
const SearchInput = styled.input`
    display: block;
    border: none;
    outline: none;
    width: 100%;
`;
const SearchButton = styled.button`
    display: inline;
    border: none;
    background-color: gray;
    border-radius: 50%;
    width: 24px;
    /* padding: 5px; */
    i {
        width: 16px;
    }
`;
const NavIcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 20px;
    margin-left: auto;
    .dropdown-toggle::after {
        display: none !important;
    }
    @media (max-width: 768px) {
        /* position: relative; */
    }
`;

const CartIcon = styled(ShoppingCart)`
    color: white;
    font-size: 50pt;
    display: inline;
`;
const CartCounter = styled.p`
    color: black;
    background-color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 0px 2px;
    border-radius: 7px;
    border: 1px black solid;
    display: inline;
    position: relative;
    bottom: 10px;
    right: 12px;
    /* font-family: 'Helvetica Neue', Helvetica, Arial; */
    @media (max-width: 768px) {
        /* width: 15vw; */
    }
`;
const UserIcon = styled(Person)`
    color: white;
    width: 10vw;
`;

export default Header;
