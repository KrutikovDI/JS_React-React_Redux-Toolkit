import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const initialState = {
  films: [],
  film: {},
  favorites: [],
  loading: false,
  error: ''
}

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const filmsSlice = createSliceWithThunk({
  name: 'films',
  initialState,
  selectors: {
    filmsState: (state) => state.films,
  },
  reducers: (create) => ({
    favoriteFilm: create.reducer((state, action) => {
      console.log(action, 'action')
      const favorFilm = state.films.find(item => {
        item.imdbID === action.payload});
      console.log(favorFilm, 'favorFilm');
      state.favorites = state.favorites.concat(favorFilm)
    }),
    deleteFilm: create.reducer((state, action) => {
      state.favorites = state.favorites.filter(item => item.imdbID !== action.payload);
    }),
    fetchFilms: create.asyncThunk(
      async (filmName, { rejectWithValue }) => {
        try {
          const response = await fetch(`https://www.omdbapi.com?apikey=64405bd2&s=${filmName}}`);
          if (!response.ok) {return rejectWithValue ('Ошибка загрузки фильма')}
          return await response.json();
        } catch (e) {
          return rejectWithValue(e)
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = "";
          state.films = []
        },
        fulfilled: (state, action) => {
          state.films = action.payload.Search;
          state.error = "";
        },
        rejected: (state, action) => {
          state.error = action.payload;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    fetchFilm: create.asyncThunk(
      async (idFilm, { rejectWithValue }) => {
        try {
          console.log(idFilm)
          const response = await fetch(`https://www.omdbapi.com?apikey=64405bd2&i=${idFilm}`);
          if (!response.ok) {return rejectWithValue ('Ошибка загрузки фильма')}
          return await response.json();
        } catch (e) {
          return rejectWithValue(e)
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = "";
        },
        fulfilled: (state, action) => {
          console.log(action.payload)
          state.film = action.payload;
          state.error = "";
        },
        rejected: (state, action) => {
          state.error = action.payload;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
  }),
});

export const { fetchFilms, fetchFilm, favoriteFilm, deleteFilm } = filmsSlice.actions;
export const { filmsState } = filmsSlice.selectors;
export default filmsSlice.reducer;