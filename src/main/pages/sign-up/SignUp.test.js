import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from 'src/testUtils';
import SignUp from './SignUp';

const mockStore = configureStore([]);

describe('SignUp component should render in DOM', () => {
   let container;
   let store;

   beforeEach(() => {
      container = document.createElement('div');
      store = mockStore({
         modelData: {
            users: [],
         },
         stateData: {
            menuIsOpen: false,
         },
      });
   });

   afterEach(() => {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
      container = null;
   });

   test('should render', () => {
      render(
         <Provider store={store}>
            <SignUp />
         </Provider>,
      );
      expect(screen.queryByText('Sing Up form')).toBeInTheDocument();
   });
});
