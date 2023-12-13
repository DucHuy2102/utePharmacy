import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, productsSelector } from '../../store/reducers/productsSlice';
import { Table } from './Table';
const Styles = styled.div`
    padding: 1rem;
    /* width: 100%; */
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 6px #b2b2b2;
    margin: 4px 10px;
    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }
    }
`;

const TableExport = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Tên sản phẩm',
                columns: [
                    {
                        Header: 'Tên đầy đủ sản phẩm',
                        accessor: 'name',
                    },
                    {
                        Header: 'Xuất sứ',
                        accessor: 'brand',
                    },
                ],
            },
            {
                Header: 'Thông tin sản phẩm',
                columns: [
                    {
                        Header: 'Mã',
                        accessor: 'product_id',
                    },
                    {
                        Header: 'CPU',
                        accessor: 'cpu',
                    },
                    {
                        Header: 'Ram',
                        accessor: 'ram',
                    },
                    {
                        Header: 'Giá',
                        accessor: 'price',
                    },
                ],
            },
        ],
        []
    );

    const products = useSelector(productsSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        // send request to jsonplaceholder
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <Styles>
            <Table columns={columns} data={products} />
        </Styles>
    );
};

export default TableExport;
