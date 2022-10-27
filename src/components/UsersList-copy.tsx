import { Box, Typography, Skeleton } from "@mui/material";
import { useUsersListQuery } from "services/placeholderApi";
import { UserInterface } from "types/placeholderApiTypes";
// import User from "./User";

const UsersList = () => {
  const usersListQuery = useUsersListQuery({});

  if (usersListQuery.isFetching)
    return <Skeleton variant="rounded" width="100%" height={120} />;

  const users = usersListQuery.data;

  console.log(users);

  return (
    <>
      {/* {users.map((user: UserInterface) => (
        <User key={user.id} user={user} />
      ))} */}
    </>
  );
};

export default UsersList;
