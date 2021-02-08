import actionsTypes from "./actionsTypes";

export default {
  addArtists: (value) => {
    return {
      type: actionsTypes.ADD_ARTISTS,
      payload: value,
    };
  },
};
