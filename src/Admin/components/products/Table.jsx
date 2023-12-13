import { useTable, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleStatus } from '../../store/reducers/productsSlice';
export function Table({ columns, data }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    const firstPageRows = rows.slice(0, rows.length);
    const dispatch = useDispatch();
    const handleToggle = (id) => {
        dispatch(toggleStatus(id));
    };
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                </th>
                            ))}
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                                <td>
                                    <Link to={`detail?id=${row.cells[2].value}`}>
                                        <Button style={{ width: '75px' }}>Chi tiết</Button>
                                    </Link>
                                </td>
                                <td>
                                    <Button style={{ width: '75px' }} onClick={() => handleToggle(data[i].product_id)}>
                                        {data[i].isDisabled === 1 ? 'Hủy' : 'Bán'}
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
            {/* <div>Showing the first 20 results of {rows.length} rows</div> */}
        </>
    );
}
