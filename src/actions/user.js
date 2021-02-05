import actionsTypes from "./actionsTypes";

export default {
  addUser: (value) => {
    return {
      type: actionsTypes.ADD_USER,
      payload: value,
    };
  },
};
