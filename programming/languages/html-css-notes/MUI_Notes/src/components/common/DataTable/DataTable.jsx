/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
export default function DataTable({ rows, columns, loading, sx }) {
	// const [pageSize, setPageSize] = useState(2);
	return (
		<DataGrid
			rows={rows}
			columns={columns}
			loading={loading}
			checkboxSelection
			pagination
			// pageSizepageSize}
			// onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
			// // Options for displaying the tables is having 2, 5, or 10 rows per page
			// pageSizeOptions={[5, 10, 25]}
		/>
	);
}
