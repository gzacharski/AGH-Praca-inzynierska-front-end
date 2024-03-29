import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import App from './App';
import { Footer, Header, Navigation, Page } from './layout';

Enzyme.configure({ adapter: new Adapter() });

describe('App renders', () => {
   xtest('wihout crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
   });
});

describe('App contains', () => {
   let wrapper = null;

   beforeEach(() => {
      wrapper = shallow(<App />);
   });

   xtest('Footer component', () => {
      const componentExists = wrapper.exists(Footer);
      expect(componentExists).toBe(true);
   });

   xtest('Header component', () => {
      const componentExists = wrapper.exists(Header);
      expect(componentExists).toBe(true);
   });

   xtest('Navigation component', () => {
      const componentExists = wrapper.exists(Navigation);
      expect(componentExists).toBe(true);
   });

   xtest('Page component', () => {
      const componentExists = wrapper.exists(Page);
      expect(componentExists).toBe(true);
   });
});

describe('App root div contains:', () => {
   beforeEach(() => render(<App />));

   xtest('main tag', () => {
      expect(screen.getByRole('main')).toBeInTheDocument();
   });
});

describe('App div root child:', () => {
   xtest('is 1 child elements', () => {
      const { container } = render(<App />);
      expect(container.childNodes.length).toEqual(1);
   });
});
