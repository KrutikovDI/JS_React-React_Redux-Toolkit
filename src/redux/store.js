import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filmsReducer from "../slices/filmsSlice";
// import usersReducer from "../slices/usersSlice";




export const store = configureStore({
  reducer: combineReducers ({
    films: filmsReducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;