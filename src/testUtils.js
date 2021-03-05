import React from 'react';
import { render as RTLrender } from "@testing-library/react";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import stateReducer from './main/store/state/reducer';
import modelReducer from './main/store/model/reducer';

const render = (
    ui,
    {
        initialStore,
        store = createStore(combineReducers({
            modelData: modelReducer,
            stateData: stateReducer,
        })),
        ...renderOptions
    } = {}
) => {
    const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    return RTLrender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render }