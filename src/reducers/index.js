import { combineReducers } from "redux";
import { crudReducer } from "./crudReducer";


const reducer = combineReducers({
  crudBD: crudReducer,
});

export default reducer;
