import * as types from "../actions/types";

const initialState = {
  loggedIn: undefined,
};

function rootReducer(state = initialState, action) {
  if (action.type === types.UPDATE_AUTH_STATE) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default rootReducer;
