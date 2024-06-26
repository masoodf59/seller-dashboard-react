import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
// components
import {
  Page,
  Label,
  Scrollbar,
  Iconify,
  SearchNotFound,
} from "src/components";
import UserListHead from "./components/UserListHead";
import UserListToolbar from "./components/UserListToolbar";
import UserMoreMenu from "./components/UserMoreMenu";
// mock
// import USERLIST from "../../_mock/user";
//
import { useNavigate } from "react-router-dom";
import { AllUsers } from "src/DAL/Users/User";
import moment from "moment/moment";
import { ClassNames } from "@emotion/react";
import { AdminOrderData, updateStatus } from "src/DAL/AdminOrder/AdminOrder";
import { useSnackbar } from "notistack";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: "username",
    label: "Name",
    alignRight: false,
  },
  { id: "productname", label: "Product Name", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "created_at", label: "Created At" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AdminOrder() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [USERLIST, setUSERLIST] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const getAllOrders = async () => {
    setLoading(true);
    const resp = await AdminOrderData();
    if (resp.status == true) {
      const newData = resp.orders.map((val) => {
        return {
          ...val,
          username: val.users.username,
          productname: val.products.title,
        };
      });
      setUSERLIST(newData);
      localStorage.setItem("adminorder", JSON.stringify(resp?.orders));
      setLoading(false);
    }
  };

  const handleChange = async (e, id) => {
    const value = e.target.value;
    const formData = new FormData();
    formData.append("order_id", id);
    formData.append("status", value);
    const resp = await updateStatus(formData);
    if (resp.status == true) {
      enqueueSnackbar(resp.message, { variant: "success" });
      getAllOrders();
    } else {
      enqueueSnackbar(resp.message, { variant: "error" });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const handleNav = () => {
    navigate("/users/add-user");
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Page title="User">
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4.5}
        >
          <Typography variant="h4">Admin Orders</Typography>
        </Stack>
        {loading == true ? (
          <>
            <Box>
              <CircularProgress
                sx={{ display: "flex", marginTop: "20%", marginLeft: "50%" }}
              />
            </Box>
          </>
        ) : (
          <Card
            sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", mb: 1 }}
          >
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />

                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          id,
                          username,
                          status,
                          created_at,
                          productname,
                        } = row;
                        const isItemSelected =
                          selected.indexOf(username) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              {/* <Checkbox
                                      checked={isItemSelected}
                                      onChange={(event) => handleClick(event, username)}
                                    /> */}
                            </TableCell>
                            {/* <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Typography
                                  variant="subtitle2"
                                  noWrap
                                ></Typography>
                              </Stack>
                            </TableCell> */}
                            <TableCell align="left">{username}</TableCell>
                            <TableCell align="left">{productname}</TableCell>

                            <TableCell align="left">
                              <Box>
                                <FormControl sx={{ width: 130 }}>
                                  <InputLabel id="demo-simple-select-label">
                                    Status
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={(e) => handleChange(e, id)}
                                  >
                                    <MenuItem value={0}>Pending</MenuItem>
                                    <MenuItem value={1}>Approved</MenuItem>
                                    <MenuItem value={2}>Rejected</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            </TableCell>
                            <TableCell align="left">
                              {moment(created_at).format("YYYY-MM-DD")}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}
