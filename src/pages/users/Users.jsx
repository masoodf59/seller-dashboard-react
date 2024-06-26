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
  CircularProgress,
  Box,
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
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: "username",
    label: "Name",
    alignRight: false,
    ClassName: "text-center",
  },
  { id: "email", label: "Email", alignRight: false },
  { id: "phone", label: "Phone", alignRight: false },
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

export default function Users() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [USERLIST, setUSERLIST] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const getAllUsers = async () => {
    setLoading(true);
    const resp = await AllUsers();
    if (resp.status == true) {
      setUSERLIST(resp?.users);
      localStorage.setItem("users", JSON.stringify(resp?.users));
      setLoading(false);
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

  useEffect(() => {
    getAllUsers();
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
          <Typography variant="h4">Users</Typography>
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
                        const { id, username, email, phone, created_at } = row;
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
                            <TableCell padding="checkbox"></TableCell>

                            <TableCell align="left">{username}</TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{phone}</TableCell>
                            <TableCell align="left">
                              {moment(created_at).format("YYYY-MM-DD")}
                            </TableCell>

                            {/* <TableCell align="left">
                            <UserMoreMenu />
                          </TableCell> */}
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
