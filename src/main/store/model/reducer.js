import * as ActionTypes from "./action/types";
import { initialStore } from "../initialStore";

export default function reducer(modelData, action) {
    switch (action.type) {
        case ActionTypes.ADD_USER:
            return {
                users: modelData.users.concat(action.payload.user),
            };
        default:
            return modelData || initialStore.modelData;
    }
}
