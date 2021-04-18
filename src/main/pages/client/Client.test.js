import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Client from './Client';
// import { render, screen } from '../../../testUtils';


describe('Client component', () => {
   let container;

   beforeEach(() => {
      container = document.createElement('div');
   });

   afterEach(() => {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
      container = null;
   });

   test('should render', () => {
      const element = (
         <MemoryRouter>
            <Client />
         </MemoryRouter>
      );
      ReactDOM.render(element, container);
   });

   // TODO fix test
  //  test('should contain div with data-testid main-container', () => {
  //     render(
  //        <MemoryRouter>
  //           <Client />
  //        </MemoryRouter>,
  //     );
  //     expect(screen.queryByTestId('main-container')).toBeInTheDocument();
  //  });
});
