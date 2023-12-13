import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, toggleStatus, usersSelector } from '../../store/reducers/usersSlice';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';

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

const Customer = () => {
    // redux
    const dispatch = useDispatch();
    const allUser = useSelector(usersSelector);
    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    // handle toggle
    const handleToggle = (id) => {
        dispatch(toggleStatus(id));
    };
    return (
        <Wraper>
            <TableWraper>
                <h3>Danh sách khách hàng</h3>
                <Table responsive='sm'>
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Ảnh</th>
                            <th>Tên người dùng</th>
                            <th>Họ và Tên</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Ngày sinh</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // eslint-disable-next-line array-callback-return
                            allUser.map((user) => {
                                if (user.username !== '') {
                                    return (
                                        <tr key={user.user_id}>
                                            <td>{user.user_id}</td>
                                            <td>
                                                {' '}
                                                <Avatar
                                                    alt='Remy Sharp'
                                                    sx={{ width: 30, height: 30 }}
                                                    src='https://mui.com/static/images/avatar/1.jpg'
                                                />
                                            </td>
                                            <td>{user.username}</td>
                                            <td>{user.fName + ' ' + user.lName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.birthday}</td>
                                            <td>
                                                {' '}
                                                <Button
                                                    // style={{ fontSize: "8px" }}
                                                    onClick={() => handleToggle(user.user_id)}
                                                >
                                                    {user.isBlocked === 1 ? 'Blocked' : 'Active'}
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                }
                            })
                        }
                    </tbody>
                </Table>
            </TableWraper>
        </Wraper>
    );
};

export default Customer;
