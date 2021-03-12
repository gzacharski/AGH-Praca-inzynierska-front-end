import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Login from './Login';

const mockStore = configureStore([]);

describe('Login component rendered in DOM',()=>{
    let container;
    let store;

    beforeEach(()=>{
        container=document.createElement('div');
        store = mockStore({
            modelData: {
                users: []
            },
            stateData: {
                menuIsOpen: false
            },
        })
    })

    afterEach(()=>{
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
        container=null;
    })

    test('should render',()=>{
        const element=(
            <Provider store={store}>
                <Login/>
            </Provider>
        )
        ReactDOM.render(element,container);
    })
})