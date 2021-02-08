import { combineReducers } from "redux";

import reducerUser from "~/reducers/user";
import reducerLoading from "~/reducers/loading";
import reducerArtists from "~/reducers/artists";
import reducerAlbums from "~/reducers/albums";

const reducers = combineReducers({
  reducerUser,
  reducerLoading,
  reducerArtists,
  reducerAlbums,
});

export default reducers;
