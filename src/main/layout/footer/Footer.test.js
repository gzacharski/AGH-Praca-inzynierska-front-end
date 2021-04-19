import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import userEvent from '@testing-library/user-event';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Page } from 'src/main/layout';
import Footer from './Footer';

Enzyme.configure({ adapter: new Adapter() });

describe('Footer renders', () => {
   test('wihout crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
         <MemoryRouter>
            <Footer />
         </MemoryRouter>,
         div,
      );
      ReactDOM.unmountComponentAtNode(div);
   });
});

describe('Footer component', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <Footer />
         </MemoryRouter>,
      );
   });

   test('contains title', () => {
      const title = screen.getByText(
         'System do wspomagania zarządzania placówką profilaktyki zdrowotnej',
      );
      expect(title).toBeInTheDocument();
      expect(title).toBeVisible();
   });

   describe('contains authors', () => {
      test('Bartosz Kordek', () => {
         const author = screen.getByText(/Bartosz Kordek/);
         expect(author).toBeInTheDocument();
         expect(author).toBeVisible();
      });

      test('Grzegorz Zacharski', () => {
         const author = screen.getByText(/Grzegorz Zacharski/);
         expect(author).toBeInTheDocument();
         expect(author).toBeVisible();
      });
   });

   test('contains link', () => {
      expect(screen.getByRole('link')).toBeInTheDocument();
   });
});

test('once link cliked, it should route to main page', () => {
   const history = createMemoryHistory();
   history.push('/login'); // example url
   render(
      <Router history={history}>
         <Page />
      </Router>,
   );

   expect(screen.queryByText(/Strona główna/)).not.toBeInTheDocument();

   const leftClick = { button: 0 };
   userEvent.click(
      screen.getByText(
         /System do wspomagania zarządzania placówką profilaktyki zdrowotnej/i,
      ),
      leftClick,
   );

   expect(screen.getByText(/Strona główna/)).toBeInTheDocument();
});
