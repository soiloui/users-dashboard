import * as React from "react";
import {
  Box,
  Button,
  Modal,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { UserInterface } from "types/placeholderApiTypes";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";

interface Props {
  user: UserInterface;
}

const UsersTableRow = ({ user }: Props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell style={{ width: 16, maxWidth: 16 }}>{user.id}</TableCell>
      <TableCell style={{ width: 190, maxWidth: 190 }}>{user.name}</TableCell>
      <TableCell style={{ width: 120, maxWidth: 120 }}>
        {user.username}
      </TableCell>
      <TableCell style={{ width: 120, maxWidth: 120 }}>
        {user.address?.city}
      </TableCell>
      <TableCell style={{ width: "auto" }}>{user.email}</TableCell>

      <TableCell>
        <Link to={`/user-form/${user.id}`}>
          <Edit
            sx={{
              color: theme.palette.warning.light,
              cursor: "pointer",
            }}
          />
        </Link>
      </TableCell>

      <TableCell>
        <Delete
          onClick={handleOpenModal}
          sx={{ color: theme.palette.error.light, cursor: "pointer" }}
        />
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 2,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={theme.palette.error.light}
              sx={{
                mb: 5,
                fontWeight: 600,
              }}
            >
              Are you sure to delete user?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      </TableCell>
    </TableRow>
  );
};

export default UsersTableRow;
