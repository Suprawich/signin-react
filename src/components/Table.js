import * as React from "react"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { randomInt, randomUserName } from "@mui/x-data-grid-generator";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

function Table({ items }) {
  let [rows, setRows] = React.useState(() => [
    
  ]);
  
  const columns = [
    {
      field: "selection",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <div>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Title", flex: 1 },
    { field: "when", headerName: "Completed", width: 120 },
  ];

  rows = items.map((item) => ({
    selection: false, // You can manage the selection state here
    id: item.id,
    name: item.name,
    when: item.when,
  }));

  let idCounter = 0;
  const createRandomRow = () => {
    idCounter += 1;
    return {
      id: idCounter,
      username: randomUserName(),
      age: randomInt(10, 80),
    };
  };

  const handleUpdateRow = () => {
    if (rows.length === 0) {
      return;
    }
    setRows((prevRows) => {
      const rowToUpdateIndex = randomInt(0, rows.length - 1);

      return prevRows.map((row, index) =>
        index === rowToUpdateIndex
          ? { ...row, username: randomUserName() }
          : row
      );
    });
  };

  const handleUpdateAllRows = () => {
    setRows(rows.map((row) => ({ ...row, username: randomUserName() })));
  };

  const handleDeleteRow = () => {
    if (rows.length === 0) {
      return;
    }
    setRows((prevRows) => {
      const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
      return [
        ...rows.slice(0, rowToDeleteIndex),
        ...rows.slice(rowToDeleteIndex + 1),
      ];
    });
  };

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, createRandomRow()]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={1}>
        <Button size="small" onClick={handleUpdateRow}>
          Update a row
        </Button>
        <Button size="small" onClick={handleUpdateAllRows}>
          Update all rows
        </Button>
        <Button size="small" onClick={handleDeleteRow}>
          Delete a row
        </Button>
        <Button size="small" onClick={handleAddRow}>
          Add a row
        </Button>
      </Stack>
      <Box sx={{ height: 400, mt: 1 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          checkboxSelection={false} // Disable the default checkbox selection
          // Other configurations
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </Box>
  );
}

export default Table;
