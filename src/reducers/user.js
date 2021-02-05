import actionsTypes from "~/actions/actionsTypes";

const INITIAL_STATE = {};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.ADD_USER:
      return { ...state, userInfo: action?.payload };

    default:
      return state;
  }
};

export default reducers;
