import React from 'react';
import styled from 'styled-components';
import { ShoppingCart, Person } from '@mui/icons-material';
import { Navbar, Container, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNumCart, numCartSelector } from '../store/reducers/numCartSlice';
import { FaSearch } from 'react-icons/fa';
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
                <Container style={{maxWidth: '1350px', marginLeft: '100px', padding: '0px'}}>
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

                    <Navbar.Collapse id='responsive-navbar-nav' style={{marginLeft: '15%'}}>
                        <SearchBar className='searchbar overflow-hidden'>
                            <SearchInput
                                type='text'
                                name='search_product'
                                id='search_product'
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                placeholder='Tìm kiếm thuốc...'
                                onKeyUp={(e) => searchProduct(e)}
								style={{width: '420px'}}
                            />
							<div style={{display: 'flex', backgroundColor: '#ade8f4', padding: '15px', borderRadius: '50%'}}>
								<FaSearch style={{ height: '17px', width: '17px'}}/>
							</div>
                        </SearchBar>

                        <Nav className='me-auto'></Nav>

                        <Nav style={{ marginRight: '20px' }}>
                            <Nav.Link as={Link} to='/news' style={{ color: 'white' }}>
                                Góc sức khỏe
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    <NavIcon>
                        <div style={{ marginLeft: 'auto', minWidth: '60px', marginRight: '15px' }}>
                            <Link style={{ textDecoration: 'none', display: 'flex', gap: '10px', color: 'white', padding: '10px 20px', backgroundColor: '#1053b6', borderRadius: '50px' }} to='/cart'>
								<div style={{position: 'relative'}}>
									<CartIcon />
									<CartCounter>{numCart}</CartCounter>
								</div>
                                <span>Giỏ hàng</span>
                            </Link>
                        </div>

                        <Dropdown>
                            <Dropdown.Toggle style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', gap: '5px', borderRadius: '50px', backgroundColor: '#1053b6', padding: '10px 10px' }}>
                                <UserIcon></UserIcon>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ zIndex: '9999', border: '0.1px solid black', minWidth: '50px' }}>
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
    border-radius: 30px;
    padding: 5px 5px 5px 20px;
`;
const SearchInput = styled.input`
    border: none;
    outline: none;
    width: 100%;
`;

const NavIcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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
const CartCounter = styled.span`
    color: black;
	min-height: 16px;
	min-width: 16px;
    background-color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 0px 4px;
    border-radius: 50%;
    position: absolute;
    top: -3px;
    right: -3px;
	line-height: 16px;
	background-color: #f7a072;
`;
const UserIcon = styled(Person)`
    color: white;
    width: 10vw;
`;

export default Header;
