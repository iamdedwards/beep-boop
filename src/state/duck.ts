import {Reducer }from "redux";
import * as _ from "lodash";

type Payload<T, TKey extends keyof T> = T[TKey] extends (state: unknown, payload: infer TPayload) => unknown ? 
    TPayload : never;

export interface AppAction<T> {
    type: keyof T;
    payload: Payload<T, keyof T>;
} 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ReductionMap { [K: string]: (state: any, ...args: any[]) => any }

export function createReducer<S, R extends ReductionMap>(defaultState: S, reductions: R): Reducer<S> {
    return (
        oldState = defaultState, 
        action: AppAction<R>
    ): S => { 
        if (reductions[action.type]) {
            return reductions[action.type](oldState, action.payload)
        }
        return oldState;
    };
}

type ActionCreators<T> = { [K in keyof T]: (payload: Payload<T, K>) => AppAction<T> };

export function createActions<R extends ReductionMap>(reductions: R): ActionCreators<R> {
    return _(reductions)
        .mapValues((__, key: keyof R): (payload: Payload<R, typeof key>) => AppAction<R> => 
            (payload: Payload<R, typeof key>): AppAction<R> => ({ type: key, payload }))
        .value();
}

type ActionKeys<T> = { [K in keyof T]: string | number | symbol };

export function createActionKeys<R extends ReductionMap>(reductions: R): ActionKeys<R>  {
    return _(reductions)
        .mapValues((__, key: keyof R): typeof key => key)
        .value();
}

export type Quack<TState, TPayload = undefined> = TPayload extends undefined 
    ? (state: TState) => TState 
    : (state: TState, payload: TPayload) => TState;

export default class Duck<S, R extends { [K: string]: Quack<S, unknown> }> {
    public reducer: Reducer<S>;
    public actions: ActionCreators<R>;
    public actionKeys: ActionKeys<R>;
    
    public constructor(defaultState: S, reductions: R) {
        this.reducer = createReducer(defaultState,reductions);
        this.actions = createActions(reductions);
        this.actionKeys = createActionKeys(reductions);
    }
}