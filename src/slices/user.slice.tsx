import {createSlice} from "@reduxjs/toolkit";
import User from "@/models/User";

interface UserState {
  users: User[];
  currentUser: User | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    selectUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Export actions from the slice
export const { addUser, removeUser, updateUser, selectUser } = userSlice.actions;

export const selectAllUsers = (state: { user: UserState }) => state.user.users;
export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export default userSlice.reducer;
