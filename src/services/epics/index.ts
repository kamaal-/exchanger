import { combineEpics } from "redux-observable";
import convert from "./convert";
import polling from "./polling";

export default combineEpics(convert, polling);
