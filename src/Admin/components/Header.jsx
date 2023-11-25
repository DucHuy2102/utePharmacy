import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import swal from 'sweetalert';
import { Search, Input, Avatar, HeaderWrapper, Icon, IconSearch } from './style';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Button1 = styled.button`
    outline: none;
    border: 1px solid #ccc;
    padding: 8px 16px;
    border-radius: 6px;
    background-color: green;
    color: white;
    transition: 0.4s;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: green;
    }
`;
const Header = ({ setToogleNav, isProduct }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        swal({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal('Logout success', {
                    icon: 'success',
                });
                // handleClose();
                sessionStorage.removeItem('admin');
                navigate('/admin/login');
            } else {
                swal('Your imaginary file is safe!');
            }
        });
    };
    return (
        <HeaderWrapper>
            <Icon>
                <AiOutlineMenu style={{ cursor: 'pointer' }} onClick={() => setToogleNav((toogleNav) => !toogleNav)} />
            </Icon>
            <Search>
                <Input type='text' placeholder='Search here'></Input>
                <IconSearch>
                    <BsSearch />
                </IconSearch>
            </Search>
            {isProduct && <Button1>Add Product</Button1>}
            <Avatar>
                <Button
                    style={{ marginLeft: '-12px' }}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    src=''
                >
                    <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                </Button>
                <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                </Menu>
            </Avatar>
        </HeaderWrapper>
    );
};

export default Header;
