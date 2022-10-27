import { Box, Button, Skeleton, TextField, Typography } from "@mui/material";
import { UserInterface } from "types/placeholderApiTypes";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "services/placeholderApi";
import { useState } from "react";

const UserFormEdit = () => {
  const [user, setUser] = useState<any>({});
  const { userId } = useParams();

  const getUserQuery = useGetUserQuery({ id: userId });
  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInterface>();

  if (getUserQuery.isSuccess && Object.keys(user).length === 0) {
    setUser(getUserQuery.data);
  }

  function handleSubmitUserEdit(data: UserInterface) {
    const upadtedUser = { ...user, ...data };

    updateUser({
      id: userId,
      data: upadtedUser,
    });
  }

  return (
    <>
      <Typography variant="h1" color="primary" sx={{ mt: 2, mb: 4 }}>
        Edit user
      </Typography>

      {getUserQuery.isFetching ? (
        <Skeleton
          height={300}
          width={400}
          variant="rounded"
          sx={{ mt: 2, mb: 4 }}
        />
      ) : (
        <Box
          component="form"
          sx={{
            display: "grid",
            flexDirection: "column",
            gap: "10px",
            width: 400,
          }}
          onSubmit={handleSubmit((data) => {
            handleSubmitUserEdit(data);
          })}
        >
          <TextField
            id="name"
            label="Name*"
            variant="filled"
            defaultValue={user?.name}
            {...register("name", {
              required: true,
            })}
            error={errors.name && true}
            helperText={errors.name && "This field is required."}
          />

          <TextField
            id="email"
            label="Email*"
            variant="filled"
            //   type={"email"}
            defaultValue={user?.email}
            {...register("email", { required: true })}
            error={errors.email && true}
            helperText={errors.email && "This field is required."}
          />

          <TextField
            id="username"
            label="Username"
            variant="filled"
            defaultValue={user?.username}
            {...register("username")}
          />

          <TextField
            id="city"
            label="City"
            variant="filled"
            defaultValue={user?.address?.city}
            {...register("address.city")}
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      )}
    </>
  );
};

export default UserFormEdit;
