import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { changeStateOrder, getAllOrder, ordersSelector } from '../../store/reducers/ordersSlice';
import { useEffect } from 'react';
import { Menu, MenuItem } from '@mui/material';
import swal from 'sweetalert';

const Orders = () => {
    // state
    const [listStatus] = useState(['Pending', 'Delivering', 'Delivered', 'Cancelled']);
    const [stateTemp, setStateTemp] = useState({
        id: null,
        state: null,
    });
    // drop down
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

		const statusColor = new Map();
		statusColor.set('Pending', '#0275d8');
		statusColor.set('Delivering', '#f0ad4e');
		statusColor.set('Delivered', '#5cb85c');
		statusColor.set('Cancelled', '#d9534f');

    // navigate
    const navigate = useNavigate();

    // redux
    const allOrder = useSelector(ordersSelector);
    const dispatch = useDispatch();

    // change
    const handleChangeState = (id, state) => {
        // alert(id + state);
        dispatch(changeStateOrder({ id, state }));
        handleClose();
        swal('Changing success', '', 'success');
    };

    // effect
    useEffect(() => {
        dispatch(getAllOrder());
    }, [dispatch]);
    if (!allOrder) return <h1>Không có đơn hàng</h1>;
    return (
        <Wraper>
            <TableWraper>
                <h3>Danh sách đơn hàng</h3>
                <Table responsive='sm'>
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>Phí vận chuyển</th>
                            <th>Tổng cộng</th>
                            <th>Cập nhật</th>
                            <th>Trạng thái</th>
                            <th>Hóa đơn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrder.map((order) => {
                            return (
                                <tr key={order.order_id}>
                                    <td>{order.order_id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.total_ship}</td>
                                    <td>{order.total}</td>
                                    <td>{order.date}</td>
                                    <td>
                                        <Span
                                            style={{ marginLeft: '-12px' }}
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup='true'
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(e) => {
                                                handleClick(e);
                                                setStateTemp({
                                                    id: order.order_id,
                                                    state: order.state,
                                                });
                                            }}
                                            src=''
                                            color={statusColor.get(order.state)}
                                        >
                                            {order.state}
                                        </Span>
                                        {/* </Button> */}
                                    </td>
                                    <Td onClick={() => navigate(`../invoice?id=${order.order_id}`)}>
                                        <IconWraper style={{ marginLeft: '-45px' }}>
                                            <AiFillEye />
                                        </IconWraper>
                                    </Td>
                                </tr>
                            );
                        })}
                        <Menu
                            id='basic-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                                // eslint-disable-next-line array-callback-return
                                listStatus.map((item) => {
                                    if (item !== stateTemp.state) {
                                        return (
                                            <MenuItem key={item} onClick={() => handleChangeState(stateTemp.id, item)}>
                                                {item}
                                            </MenuItem>
                                        );
                                    }
                                })
                            }
                        </Menu>
                    </tbody>
                </Table>
            </TableWraper>
        </Wraper>
    );
};

export default Orders;

const Wraper = styled.div`
    background-color: #f3f3f9;
    height: 85vh;
    overflow: auto;
    width: 100%;
`;
const TableWraper = styled.div`
    /* width: 90%; */
    margin: 25px 8px;
    box-shadow: 0px 0px 6px #b2b2b2;
    background-color: white;
    border-radius: 5px;
    padding: 4px 14px;
    color: #3c4858;
`;
const Td = styled.td`
    text-align: center;
`;
const IconWraper = styled.div`
    display: inline-block;
    margin: 0 4px;
    color: ${(props) => (props.color ? props.color : 'inherit')};
    cursor: pointer;
    font-size: 18px;
`;
const Span = styled.span`
    background-color: ${(props) => props.color};
    padding: 3px;
    border-radius: 2px;
    color: white;
    cursor: pointer;
`;
