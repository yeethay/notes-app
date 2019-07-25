import * as types from "./types";

export function updateAuthStateAction(payload) {
  return { type: types.UPDATE_AUTH_STATE, payload };
}
