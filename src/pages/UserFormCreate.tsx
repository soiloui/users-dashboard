import { Box, Button, TextField, Typography } from "@mui/material";
import { UserInterface } from "types/placeholderApiTypes";
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "services/placeholderApi";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateLastId } from "features/users/usersSlice";
import { RootState } from "app/store";
import { Link, useNavigate } from "react-router-dom";

const UserFormCreate = () => {
  const [addUserAPI] = useAddUserMutation();
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { lastId } = useSelector((store: RootState) => store.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInterface>();

  function handleSubmitUserCreate(user: UserInterface) {
    const newLastId = lastId + 1;

    disptach(updateLastId({ newLastId: newLastId }));
    user.id = newLastId;
    addUserAPI({
      data: user,
    });
    disptach(addUser({ user: user }));

    navigate("/");
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
        onSubmit={handleSubmit((user) => {
          handleSubmitUserCreate(user);
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
          type={"email"}
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

        <Link to="/">
          <Button variant="contained" color="error" sx={{ width: "100%" }}>
            Cancel
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default UserFormCreate;
