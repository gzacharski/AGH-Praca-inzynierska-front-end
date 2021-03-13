import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Home from './Home';

const mockStore = configureStore([]);

describe('Home component', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
          modelData: {
            users: [],
          },
          stateData: {
            menuIsOpen: false,
          },
        });

        component = renderer.create(
            <Provider store={store}>
                <Home />
            </Provider>
        )
    })

    afterEach(() => {
        component.unmount()
    })

    test('should render with given state from Redux store.', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })

    test('should contain button with class name MuiButtonBase-root.', () => {
        const element=component.root.findByType('button');
        expect(element.props.className.includes('MuiButtonBase-root')).toBeTruthy();
    })

    // test('should dispatch an action on button click.', () => {
    //     renderer.act(() => {
    //         component.root.findByType('button').props.onClick();
    //     });

    //     expect(store.dispatch).toHaveBeenCalled();
    // })
})

describe('Home component rendered in DOM',()=>{
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
                <Home/>
            </Provider>
        )
        ReactDOM.render(element,container);
    })
})