import React, { useState, useMemo, useCallback } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import 'react-datepicker/dist/react-datepicker.css';

function Table() {
  const [data, setData] = useState([
    { id: 1, username: 'John Doe', addedDate: '2022-02-05', status: 'Active' },
    { id: 2, username: 'Jane Doe', addedDate: '2022-02-04', status: 'Active' },
  ]);

  const [newUser, setNewUser] = useState({ username: '', addedDate: '', status: 'Active' });

  const columns = useMemo(
    () => [
      { Header: 'Username', accessor: 'username' },
      { Header: 'Added Date', accessor: 'addedDate' },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button onClick={() => handleDelete(row.original.id)} className="text-red-500">
              Delete
            </button>
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

  const handleAddUser = () => {
    if (newUser.username && newUser.addedDate) {
      setData((prevData) => [
        ...prevData,
        {
          id: Math.max(...prevData.map((user) => user.id), 0) + 1,
          ...newUser,
        },
      ]);
      setNewUser({ username: '', addedDate: '', status: 'Active' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Active Users</h1>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={newUser.addedDate}
          onChange={(e) => setNewUser({ ...newUser, addedDate: e.target.value })}
          className="p-2 border rounded"
        />
        <button onClick={handleAddUser} className="bg-green-500 text-white p-2 rounded">
          Add
        </button>
      </div>
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
