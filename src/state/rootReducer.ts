import { combineReducers, ReducersMapObject } from "redux";
import { WordMap } from "./words/wordState";
import { wordDuck } from "./words/wordDuck";

export interface AppState {
    words: WordMap;
};

const appReducer: ReducersMapObject<AppState> = {
    words: wordDuck.reducer
};

export default combineReducers(appReducer);