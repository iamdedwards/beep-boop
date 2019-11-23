import { AppState } from "../rootReducer";

export type Frequency = 1 | 2| 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Language = "English" | "French" | "Arabic";

export interface WordDetails {
    frequency: Frequency;
    language: Language;
    when: string;
};

export interface WordMap {
    [KDate: string]: {
        [KWord: string]: WordDetails;
    };
}

export const getWordMap = (state: AppState): WordMap => state.words;