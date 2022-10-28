import { createSlice } from "@reduxjs/toolkit";
import { placeholderApi } from "services/placeholderApi";
import { UserInterface } from "types/placeholderApiTypes";

interface InitialStateInterface {
  usersList: UserInterface[];
  lastId: number;
  sortMode: 0 | 1 | 2;
}

const initialState: InitialStateInterface = {
  usersList: [],
  lastId: 0,
  sortMode: 0,
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
    sortUsers: (state) => {
      switch (state.sortMode) {
        case 0:
          state.sortMode = 1;
          state.usersList = state.usersList.sort((a, b) => {
            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
          });
          break;
        case 1:
          state.sortMode = 2;
          state.usersList = state.usersList.sort((a, b) => {
            return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
          });
          break;
        case 2:
          state.sortMode = 0;
          state.usersList = state.usersList.sort((a, b) => {
            return a.id > b.id ? 1 : -1;
          });
          break;
      }
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

export const { addUser, editUser, deleteUser, sortUsers, updateLastId } =
  usersSlice.actions;

export default usersSlice.reducer;
