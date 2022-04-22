import {
  CREATE_DATA,
  DELETE_DATA,
  NO_DATA,
  READ_ALL_DATA,
  UPDATE_DATA,
} from "../types";

const initialState = {
  bd: [],
};

export function crudReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_DATA: {
      return { bd: [...state.bd, action.payload] };
    }
    case READ_ALL_DATA: {
      return { bd: [...action.payload] };
    }
    case UPDATE_DATA: {
      let newData = state.bd.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
      return {
        bd: [...newData],
      };
    }
    case DELETE_DATA: {
      let bdReplace = state.bd.filter((el) => el.id !== action.payload);
      return { bd: [...bdReplace] };
    }
    case NO_DATA: {
      return initialState;
    }
    default:
      return state;
  }
}
