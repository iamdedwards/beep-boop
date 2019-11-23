import Duck from "../duck";
import { WordMap, WordDetails } from "./wordState";
import * as moment from "moment";

const localStorageKey = 'words';
const localStorageWordMap: Partial<WordMap> = JSON.parse(localStorage.getItem(localStorageKey)) || {};
console.log({localStorage});

export const wordDuck = new Duck(localStorageWordMap, {
    addOrUpdateWord: (state: WordMap, payload: { word: string; wordDetails: WordDetails }): WordMap => { 
        const day = moment().format("YYYY-MM-DD");
        const newState =  {...state, [day]: {...state[day], [payload.word]: payload.wordDetails } };
        localStorage.setItem(localStorageKey, JSON.stringify(newState));
        return newState;
    },
});
