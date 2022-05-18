import React, { useEffect } from "react";
import "./style.scss";
import * as C from "@mui/material";
import * as I from "@mui/icons-material";
import TableRow from "./TableRow";
import formatCurrency from "../../bin/utils/formatCurrency";
import PropTypes from "prop-types";

function CustomGenericTable({ loading, options, fill, onRowClick, selectedRow }) {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState({ field: "", order: "" });
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  useEffect(() => {
    if (fill) {
      setData(fill);
    }
    setPage(0);
  }, [fill]);

  function handleChangePage(event, newPage) {
    data.forEach((item) => {
      item.selected = false;
    });
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const sortList = (sorter) => {
    let order = "";
    if (orderBy.order === "") {
      setOrderBy({ field: sorter.field, order: "desc" });
      order = "desc";
    } else if (orderBy.order === "desc") {
      setOrderBy({ field: sorter.field, order: "asc" });
      order = "asc";
    } else {
      setOrderBy({ field: "", order: "" });
    }
    data.sort((a, b) => {
      let fieldA = Number(a[sorter.field]) || a[sorter.field];
      let fieldB = Number(b[sorter.field]) || b[sorter.field];
      switch (order) {
        case "asc":
          if (fieldA < fieldB) return -1;
          if (fieldA > fieldB) return 1;
          break;
        case "desc":
          if (fieldA < fieldB) return 1;
          if (fieldA > fieldB) return -1;
          break;
        default:
          if (fieldA < fieldB) return 1;
          if (fieldA > fieldB) return -1;
          break;
      }
      return 0;
    });
    setData([...data]);
  };

  return (
    <>
      <C.Box sx={{ width: "100%", maxHeight: "100%" }} className="custom-table--box-container">
        <C.TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
          <C.Table stickyHeader={true}>
            <C.TableHead>
              <C.TableRow>
                {options?.tableHeader?.map((headerItem, k) => (
                  <C.TableCell
                    onClick={() => headerItem.sort && sortList(headerItem)}
                    key={`th-${k}`}
                    className={`${headerItem.sort ? "custom-table--sorter" : ""}`}
                    {...(headerItem.props || {})}
                  >
                    <div style={{ display: "flex", gap: 2 }}>
                      {headerItem.title}
                      {orderBy.field === headerItem.field && (orderBy.order === "desc" ? <I.ArrowDownward /> : <I.ArrowUpward />)}
                    </div>
                  </C.TableCell>
                ))}
              </C.TableRow>
            </C.TableHead>

            <C.TableBody>
              {data?.length <= 0 && loading ? (
                <TableRow>
                  <C.TableCell colSpan={options.tableHeader.length}>
                    <C.Skeleton variant="text" animation="pulse" sx={{ width: "100%", height: 30 }} />
                  </C.TableCell>
                </TableRow>
              ) : (
                (data?.length > 0 &&
                  data
                    .filter((_, index) => index >= page * rowsPerPage && index < page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      item.selected = item.selected || false;
                      return (
                        <TableRow
                          style={{
                            ...(item.tipo === "E"
                              ? { backgroundColor: "#edf7ed", color: "#1e4620" }
                              : { backgroundColor: "#fdeded", color: "#5f2120" }),
                          }}
                          key={`tr-user-${item.id}`}
                          onClick={() => onRowClick(item)}
                          selected={selectedRow?.id === item.id}
                        >
                          {options?.tableHeader?.map((headerItem, k) => (
                            <C.TableCell key={`td-${k}`} {...(headerItem.props || {})}>
                              {headerItem.type === "currency" ? (
                                <div>{formatCurrency(item[headerItem.field])}</div>
                              ) : headerItem.type === "date" ? (
                                <div>{new Date(item[headerItem.field]).toLocaleDateString()}</div>
                              ) : (
                                <div>{item[headerItem.field]}</div>
                              )}
                            </C.TableCell>
                          ))}
                        </TableRow>
                      );
                    })) || (
                  <C.TableRow>
                    <C.TableCell colSpan={options?.tableHeader?.length + 1} style={{ textAlign: "center" }}>
                      <span>Nenhum registro para exibir</span>
                    </C.TableCell>
                  </C.TableRow>
                )
              )}
            </C.TableBody>
          </C.Table>
        </C.TableContainer>
        <C.TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
          labelRowsPerPage="Registros por página"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </C.Box>
    </>
  );
}

CustomGenericTable.propTypes = {
  loading: PropTypes.bool,
  options: PropTypes.object.isRequired,
  fill: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSwitchCallback: PropTypes.func,
  onRowClick: PropTypes.func,
  selectedRow: PropTypes.object,
  onSave: PropTypes.func,
  onCancelSave: PropTypes.func,
};

export default CustomGenericTable;
