import { Box, Button, TextField, Typography } from "@mui/material";
import { UserInterface } from "types/placeholderApiTypes";
import { useForm } from "react-hook-form";
import {
  useUsersListQuery,
  useCreateUserMutation,
} from "services/placeholderApi";

const UserFormCreate = () => {
  const usersListQuery = useUsersListQuery({});
  const [createUser] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInterface>();

  function handleSubmitUserCreate(data: UserInterface) {
    createUser({
      id: usersListQuery.data.length + 1,
      data: data,
    });
  }

  return (
    <>
      <Typography variant="h1" color="primary" sx={{ mt: 2, mb: 4 }}>
        Create user
      </Typography>

      <Box
        component="form"
        sx={{
          display: "grid",
          flexDirection: "column",
          gap: "10px",
          width: 400,
        }}
        onSubmit={handleSubmit((data) => {
          handleSubmitUserCreate(data);
        })}
      >
        <TextField
          id="name"
          label="Name*"
          variant="filled"
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
          {...register("email", { required: true })}
          error={errors.email && true}
          helperText={errors.email && "This field is required."}
        />

        <TextField
          id="username"
          label="Username"
          variant="filled"
          {...register("username")}
        />

        <TextField
          id="city"
          label="City"
          variant="filled"
          {...register("address.city")}
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default UserFormCreate;
