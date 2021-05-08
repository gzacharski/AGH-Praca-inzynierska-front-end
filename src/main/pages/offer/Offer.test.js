import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from 'src/testUtils';
import Offer from './Offer';

describe('Offer component', () => {
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
      const element = <Offer />;
      ReactDOM.render(element, container);
   });

   test('should contain main tag', () => {
      render(<Offer />);
      expect(screen.getByRole('main')).toBeInTheDocument();
   });
});
