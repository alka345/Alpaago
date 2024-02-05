import React, { useState, useMemo, useCallback } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import 'react-datepicker/dist/react-datepicker.css';
import { ColumnFilter } from './ColumnFilter'; // Import ColumnFilter component (see below)

function Table() {
  const [data, setData] = useState([
    { id: 1, username: 'John Doe', addedDate: '2022-02-05', status: 'Active' },
    { id: 2, username: 'Jane Doe', addedDate: '2022-02-04', status: 'Active' },
  ]);

  const [newUser, setNewUser] = useState({ id: null, username: '', addedDate: '', status: 'Active' });
  const [editMode, setEditMode] = useState(false);

  const columns = useMemo(
    () => [
      { Header: 'Username', accessor: 'username', Filter: ColumnFilter }, // Add filter to this column
      { Header: 'Added Date', accessor: 'addedDate', Filter: ColumnFilter }, // Add filter to this column
      { Header: 'Status', accessor: 'status', Filter: ColumnFilter }, // Add filter to this column
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button onClick={() => handleDelete(row.original.id)} className="text-red-500">
              Delete
            </button>
            <button onClick={() => handleEdit(row.original)}>{editMode ? 'Update' : 'Edit'}</button>
          </div>
        ),
      },
    ],
    [editMode]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter, // Access to global filter
  } = useTable({ columns, data }, useFilters, useSortBy);

  const handleDelete = useCallback((id) => {
    setData((prevData) => prevData.filter((user) => user.id !== id));
  }, []);

  const handleEdit = (user) => {
    setNewUser({ ...user });
    setEditMode(!editMode);
  };

  const handleUpdate = () => {
    if (newUser.username && newUser.addedDate) {
      setData((prevData) =>
        prevData.map((user) => (user.id === newUser.id ? { ...newUser } : user))
      );
      setEditMode(false);
      setNewUser({ id: null, username: '', addedDate: '', status: 'Active' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleAddUser = () => {
    if (newUser.username && newUser.addedDate) {
      setData((prevData) => [
        ...prevData,
        {
          id: Math.max(...prevData.map((user) => user.id), 0) + 1,
          ...newUser,
        },
      ]);
      setEditMode(false);
      setNewUser({ id: null, username: '', addedDate: '', status: 'Active' });
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
          placeholder="Search..."
          value={state.globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 border rounded"
        />
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
        <button onClick={editMode ? handleUpdate : handleAddUser} className="bg-green-500 text-white p-2 rounded">
          {editMode ? 'Update' : 'Add'}
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
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
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
