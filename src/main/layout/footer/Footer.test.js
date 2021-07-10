import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import userEvent from '@testing-library/user-event';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Footer } from './Footer';

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

test('when link clicked, it shoud route to main page', () => {
   render(
      <MemoryRouter initialEntries={['/footer']}>
         <Route exact path="/" render={() => <div>Home Page</div>} />
         <Route path="/footer" component={Footer} />
      </MemoryRouter>,
   );

   expect(
      screen.getByText(
         /System do wspomagania zarządzania placówką profilaktyki zdrowotnej/,
      ),
   ).toBeInTheDocument();
   expect(screen.queryByText(/Home Page/)).not.toBeInTheDocument();

   const leftClick = { button: 0 };
   userEvent.click(
      screen.getByText(
         /System do wspomagania zarządzania placówką profilaktyki zdrowotnej/i,
      ),
      leftClick,
   );

   expect(
      screen.queryByText(
         /System do wspomagania zarządzania placówką profilaktyki zdrowotnej/,
      ),
   ).not.toBeInTheDocument();
   expect(screen.getByText(/Home Page/)).toBeInTheDocument();
});
