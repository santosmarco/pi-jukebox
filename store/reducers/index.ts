import { combineReducers } from "redux";
import app from "./app";
import player from "./player";
import user from "./user";

export default combineReducers({ app, user, player });
