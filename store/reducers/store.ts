import { combineReducers, configureStore } from "@reduxjs/toolkit";
import trackReducer from "./track/TracksSlice";
import playlistsReducer from "./playlist/PlaylistsSlice";
import loginReducer from "./auth/LoginSlice";
import registerReducer from "./auth/RegisterSlice";
import uploadReducer from "./track/UploadSlice";
import playlistReducer from "./playlist/PlaylistSlice";
import playerReducer from "./player/PlayerSlice";
import createPlaylistReducer from "./playlist/CreatePlaylistSlice";
import addToPlaylistReducer from "./playlist/AddToPlaylistSlice";
import getFavoritesReducer from "./favorite/GetFavoritesSlice";
import addToFavoritesReducer from "./favorite/toggleFavorites";
import checkIsFavoriteReducer from "./favorite/CheckIsFavorite";
import searchReducer from "./track/SearchSlice";
import updateListensReducer from "./track/updateListensSlice";
import originalsReducer from "./playlist/OriginalsSlice";
import refreshReducer from "./auth/RefreshSlice";
import deletePlaylistReducer from "./playlist/DeletePlaylistSlice";

const rootReducer = combineReducers({
  trackReducer,
  playlistsReducer,
  loginReducer,
  registerReducer,
  uploadReducer,
  playerReducer,
  createPlaylistReducer,
  playlistReducer,
  addToPlaylistReducer,
  getFavoritesReducer,
  addToFavoritesReducer,
  checkIsFavoriteReducer,
  searchReducer,
  updateListensReducer,
  originalsReducer,
  refreshReducer,
  deletePlaylistReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
