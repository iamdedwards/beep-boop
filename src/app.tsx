import * as React from 'react';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './state/rootReducer';
import { Provider } from 'react-redux';
import Dashboard from './views/dashboard';
import { take, takeEvery, select } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)


sagaMiddleware.run(function*(){
    yield takeEvery("*", function*(action){
        console.log({action});
        console.log({wtf:yield select()});
    });
});

const App = (): JSX.Element => (
    <Provider store={store}>
        <Dashboard />
    </Provider>
);

export default App;