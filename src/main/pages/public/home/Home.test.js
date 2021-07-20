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
         users: [],
      });

      component = renderer.create(
         <Provider store={store}>
            <Home />
         </Provider>,
      );
   });

   afterEach(() => {
      component.unmount();
   });

   test('should contain button with class name MuiButtonBase-root.', async () => {
      const element = await component.root.findByType('button');
      expect(
         element.props.className.includes('MuiButtonBase-root'),
      ).toBeTruthy();
   });
});

describe('Home component rendered in DOM', () => {
   let container;
   let store;

   beforeEach(() => {
      container = document.createElement('div');
      store = mockStore({
         users: [],
      });
   });

   afterEach(() => {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
      container = null;
   });

   test('should render', () => {
      const element = (
         <Provider store={store}>
            <Home />
         </Provider>
      );
      ReactDOM.render(element, container);
   });
});
