/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import DataTable from "../DataTable/DataTable";

/*
+ Your columns:
1. Each field is a string that represents the key for the user object.
  Allowing the datagrid to correcly parse data
*/
const columns = [
	{ field: "id", headerName: "User ID", width: 150 },
	{ field: "name", headerName: "Name", width: 150 },
	{ field: "username", headerName: "Username", width: 150 },
	{ field: "email", headerName: "email", width: 150 },
];

/*
+ Our columns and their names.
1. Here we define how many columns exist in our data grid/table.
  We define the names of the columns and theirs widths. The field names
  that we use here will be the same ones that we use when making our rows


NOTE: users will be an array of objects in this form 

  {
    id: some id,
    name: some name,
    username: username,
    email: email,
  },

  if the key is 'username', we make a column with field 'username'. This 
  allows the datagrid to correctly parse data.


*/
// const rows = [
// 	{ id: 1, col1: "Hello", col2: "World" },
// 	{ id: 2, col1: "DataGridPro", col2: "is Awesome" },
// 	{ id: 3, col1: "MUI", col2: "is Amazing" },
// ];

export default function UserTable() {
	const [users, setUsers] = useState([]);

	const userTableStyles = {
		height: "650px",
	};

	//
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((json) => setUsers(json));
	});

	// Loading if there are no users.
	return (
		<DataTable
			rows={users}
			columns={columns}
			loading={!users.length}
			sx={userTableStyles}
		/>
	);
}
