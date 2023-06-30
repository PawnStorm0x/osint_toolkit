import React from "react";
import { useState } from "react";

import Card from "@mui/material/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

export default function LastAnalysisResults(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card
      key="last_analysis_results_card"
      variant="outlined"
      sx={{ m: 1, p: 2, borderRadius: 5, boxShadow: 0 }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Last analysis results
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 0,
          borderRadius: 5,
          border: 1,
          borderColor: theme.palette.background.tableborder,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  bgcolor: theme.palette.background.tablecell,
                  fontWeight: "bold",
                }}
              >
                Engine
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: theme.palette.background.tablecell,
                  fontWeight: "bold",
                }}
              >
                Category
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: theme.palette.background.tablecell,
                  fontWeight: "bold",
                }}
              >
                Result
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: theme.palette.background.tablecell,
                  fontWeight: "bold",
                }}
              >
                Method
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(
              props.result["data"]["attributes"]["last_analysis_results"]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(([name, analysis], index) => (
                <TableRow key={index}>
                  <TableCell>{name}</TableCell>
                  <TableCell
                    sx={{
                      bgcolor:
                        analysis.category === "malicious" ? "red" : "#6AAB8E",
                    }}
                  >
                    {analysis.category}
                  </TableCell>
                  <TableCell>{analysis.result}</TableCell>
                  <TableCell>{analysis.method}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={
            Object.entries(
              props.result["data"]["attributes"]["last_analysis_results"]
            ).length
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Card>
  );
}
