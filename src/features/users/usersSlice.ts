import { createSlice } from "@reduxjs/toolkit";
import { placeholderApi } from "services/placeholderApi";
import { UserInterface } from "types/placeholderApiTypes";

interface InitialStateInterface {
  usersList: UserInterface[];
  lastId: number;
}

const initialState: InitialStateInterface = {
  usersList: [],
  lastId: 0,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      const user = payload.user;

      state.usersList.push(user);
    },
    editUser: (state, { payload }) => {
      const { user } = payload;

      const userIndex = state.usersList.findIndex(
        (oldUser) => oldUser.id == user.id
      );

      state.usersList[userIndex] = user;
    },
    deleteUser: (state, { payload }) => {
      const { userId } = payload;

      const filteredUsers = state.usersList.filter(
        (user) => user.id !== userId
      );

      state.usersList = filteredUsers;
    },
    updateLastId: (state, { payload }) => {
      const { newLastId } = payload;
      state.lastId = newLastId;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      placeholderApi.endpoints.usersList.matchFulfilled,
      (state, { payload }) => {
        state.usersList = payload;
        state.lastId = payload.length;
      }
    );
  },
});

export const { addUser, editUser, deleteUser, updateLastId } =
  usersSlice.actions;

export default usersSlice.reducer;
