import { Box, Button, Skeleton, TextField, Typography } from "@mui/material";
import { UserInterface } from "types/placeholderApiTypes";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "services/placeholderApi";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "features/users/usersSlice";
import { RootState } from "app/store";

interface Params {
  userId: string;
}

const UserFormEdit = () => {
  const { userId } = useParams<keyof Params>() as Params;
  const [updateUser] = useUpdateUserMutation();
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { usersList } = useSelector((store: RootState) => store.users);
  const user = usersList.find((user) => {
    return user.id === parseInt(userId);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInterface>();

  function handleSubmitUserEdit(data: UserInterface) {
    const upadtedUser = { ...user, ...data };

    updateUser({
      id: userId,
      data: upadtedUser,
    });

    disptach(editUser({ user: upadtedUser }));
    navigate("/");
  }

  return (
    <>
      <Typography variant="h1" color="primary" sx={{ mt: 2, mb: 4 }}>
        Edit user
      </Typography>

      {!user ? (
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

          <Link to="/">
            <Button variant="contained" color="error" sx={{ width: "100%" }}>
              Cancel
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};

export default UserFormEdit;
