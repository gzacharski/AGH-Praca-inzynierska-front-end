import * as ActionTypes from "./types";

export const addUser=(user)=>({
    type:ActionTypes.ADD_USER,
    payload: {
        user
    }
})