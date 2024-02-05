import React, { useState, useMemo, useCallback } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import 'react-datepicker/dist/react-datepicker.css';
// import './index.css';

function Table() {
  const [data, setData] = useState([
    { id: 1, username: 'John Doe', addedDate: '2022-02-05', status: 'Active' },
    { id: 2, username: 'Jane Doe', addedDate: '2022-02-04', status: 'Active' },
  ]);

  const columns = useMemo(
    () => [
      { Header: 'Username', accessor: 'username' },
      { Header: 'Added Date', accessor: 'addedDate' },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => handleDelete(row.original.id)}>Delete</button>
            <button onClick={() => handleChangeStatus(row.original.id)}>
              Change Status
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy);

  const handleDelete = useCallback((id) => {
    setData((prevData) => prevData.filter((user) => user.id !== id));
  }, []);

  const handleChangeStatus = useCallback((id) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
      )
    );
  }, []);

  return (
           
<div>
      <h1 className="text-2xl font-bold mb-4">Active Users</h1>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="td">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
