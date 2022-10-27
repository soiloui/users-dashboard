import { Box, Typography } from "@mui/material";
import UsersList from "components/UsersTable";

const Dashboard = () => {
  return (
    <Box>
      <Typography color="primary" variant="h1" sx={{ mt: 2, mb: 4 }}>
        Dashboard
      </Typography>
      <UsersList />
    </Box>
  );
};

export default Dashboard;
