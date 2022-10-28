import * as React from "react";
import {
  Box,
  Skeleton,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Button,
  Tooltip,
} from "@mui/material";
import { SortByAlpha } from "@mui/icons-material";
import { Link } from "react-router-dom";
import UsersTableRow from "./UsersTableRow";
import TablePaginationActions from "components/TablePaginationActions";
import { UserInterface } from "types/placeholderApiTypes";
import { useUsersListQuery } from "services/placeholderApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "app/store";
import { sortUsers } from "features/users/usersSlice";

const UsersTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const { usersList } = useSelector((store: RootState) => store.users);
  const usersListQuery = useUsersListQuery({});
  const dispatch = useDispatch();

  if (usersListQuery.isFetching)
    return (
      <>
        <Skeleton variant="rounded" width={130} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" width="100%" height={400} />
      </>
    );

  const rows: UserInterface[] = usersList;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Link to={`/user-form`}>
          <Button variant="contained" color="primary">
            Create new
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  Username
                  <Tooltip title="Disable | A-Z | Z-A">
                    <SortByAlpha
                      sx={{ cursor: "pointer" }}
                      fontSize="small"
                      onClick={() => {
                        dispatch(sortUsers({ property: "username" }));
                      }}
                    />
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell>City</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          {usersList.length > 0 ? (
            <TableBody>
              {(rowsPerPage > 0
                ? usersList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : usersList
              ).map((user: UserInterface) => (
                <UsersTableRow key={user.id} user={user} setPage={setPage} />
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell style={{ width: "100%", maxWidth: "100%" }}>
                  No users available
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 15, 25, { label: "All", value: -1 }]}
                colSpan={7}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
