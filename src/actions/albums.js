import actionsTypes from "./actionsTypes";

export default {
  addAlbums: (value) => {
    return {
      type: actionsTypes.ADD_ALBUMS,
      payload: value,
    };
  },
};
