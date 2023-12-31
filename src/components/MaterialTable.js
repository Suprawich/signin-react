import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import moment from "moment";
import "moment/locale/th";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import momentTimezone from "moment-timezone";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import theme from "./Theme";

function CustomMaterialTable({ props, props2 }) {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const [newRowDate, setNewRowDate] = useState(new Date());

  const DateTimePickerInput = ({ value, onChange }) => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => (
          <input
            type="text"
            {...props}
            value={
              value ? moment(value).locale("th").format("DD-MM-YYYY HH:mm") : ""
            }
          />
        )}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );

  const [columns, setColumns] = useState([
    { title: "ID", field: "id", hidden: true },
    { title: "กิจกรรม", field: "name" },
    {
      title: "วันที่",
      field: "when",
      hidden: false,
      render: (rowData) => {
        return moment
          .utc(rowData.when)
          .tz("Asia/Bangkok")
          .locale("th")
          .format("D MMM YY [เวลา] H:mm น.");
      },
      editComponent: (props) => (
        <DateTimePickerInput
          value={newRowDate}
          onChange={(date) => setNewRowDate(date)}
        />
      ),
    },
  ]);
  const [data, setData] = useState([]);
  const defaultMaterialTheme = createTheme();
  const [token, setToken] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" or "error"
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    setToken(props2); // Check if `props2` is the correct value to use
  }, [props2]); // Only include props2 if it's used inside the effect

  useEffect(() => {
    setData(props);
  }, [props]);

  const handleSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ThemeProvider theme={theme}>
        <MaterialTable
          icons={tableIcons}
          title="Test Table"
          columns={columns}
          data={data}
          options={{
            columnsButton: true,
            tableLayout: "auto",
          }}
          editable={{
            onRowAddCancelled: (rowData) => {
              /* do nothing */
            },
            onRowUpdateCancelled: (rowData) => {
              /* do nothing */
            },
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  fetch("https://cache111.com/todoapi/activities", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      name: newData.name,
                      when: newRowDate,
                    }),
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Error adding row");
                      }
                      return response.json();
                    }) // Parse the JSON response
                    .then((responseData) => {
                      // Assuming the server returns the new data, including the ID
                      newData.id = responseData.id;
                      setData([...data, newData]);
                      handleSnackbar("Row added successfully", "success");
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                      handleSnackbar("Error adding row", "error");
                      reject();
                    });
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
                  fetch(
                    `https://cache111.com/todoapi/activities/${oldData.id}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        name: newData.name,
                        when: newRowDate, // Assuming newRowDate is defined somewhere
                      }),
                    }
                  )
                  .then((response) => {
                    if (!response.ok) {
                      handleSnackbar("Error updating row", "error");
                      throw new Error("Error updating row");
                    }
                    else{
                      handleSnackbar("Row updated successfully", "success");
                    }
                    return response.json();
                  })
                    .catch((error) => {
                      console.error("Error:", error);
                      reject();
                    });
                  resolve();
                }, 1000);
              }),

              onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
                  fetch(`https://cache111.com/todoapi/activities/${oldData.id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                    .then((response) => {
                      if (!response.ok) {
                        handleSnackbar("Error deleting row", "error");
                        throw new Error("Error deleting row");
                      }
                      else{
                        handleSnackbar("URow deleted successfully", "success");
                      }
                      return response.json();
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                      reject();
                    });
                }, 1000);
              }),
            
          }}
        />
      </ThemeProvider>
<Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default CustomMaterialTable;
