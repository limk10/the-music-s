import actionsTypes from "~/actions/actionsTypes";

const INITIAL_STATE = {};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.ADD_ARTISTS:
      return { ...state, addArtists: action?.payload };

    default:
      return state;
  }
};

export default reducers;
