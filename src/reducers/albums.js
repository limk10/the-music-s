import actionsTypes from "~/actions/actionsTypes";

const INITIAL_STATE = {};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.ADD_ALBUMS:
      return { ...state, addAlbums: action?.payload };

    default:
      return state;
  }
};

export default reducers;
