import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const UiTable = ({ tableContent, children }) => {
  const columns = [
    { id: "1", label: "Crop Name" },
    { id: "2", label: "Crop Disease" },
    { id: "3", label: "Action" },
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      {/* TABLE HEADER */}
      <div>{children}</div>

      {/* TABLE */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    <h3>{column.label}</h3>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableContent &&
                tableContent.map((crop) => (
                  <TableRow key={crop?.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell align="center">{crop.title}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        {crop?.disease.map((item) => (
                          <Box key={item?.id} sx={{ p: 1, m: 1 }}>
                            <h4>{item?.title}</h4>
                          </Box>
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <VisibilityIcon sx={{ mx: 1 }} />
                      <EditIcon sx={{ mx: 1 }} />
                      <DeleteOutlineIcon sx={{ mx: 1 }} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          count={tableContent?.length}
        />
        {/* count={rows.length} */}
      </Paper>
    </div>
  );
};

export default UiTable;
