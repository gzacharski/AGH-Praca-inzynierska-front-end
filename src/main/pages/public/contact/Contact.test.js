import React from 'react';
import ReactDOM from 'react-dom';
import Contact from './Contact';
import { render, screen } from '../../../../testUtils';

describe('Contact component', () => {
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
      const element = <Contact />;
      ReactDOM.render(element, container);
   });

   test('should contain div with data-testid main-container', () => {
      render(<Contact />);
      expect(screen.queryByTestId('page-container')).toBeInTheDocument();
   });
});
