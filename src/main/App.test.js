import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme,{shallow} from 'enzyme';
import App from './App';
import {Footer,Header,Navigation,Page} from './layout';

Enzyme.configure({adapter: new Adapter()});

describe('App renders ',()=>{
  test('wihout crashing', ()=>{
    const div=document.createElement('div');
    ReactDOM.render(<App/>,div);
    ReactDOM.unmountComponentAtNode(div);
  })
})

describe('App renders: ',()=>{
  test('Footer component', ()=>{
    const wrapper=shallow(<App/>);
    const componentExists=wrapper.exists(Footer);
    expect(componentExists).toBe(true);
  })

  test('Header component', ()=>{
    const wrapper=shallow(<App/>);
    const componentExists=wrapper.exists(Header);
    expect(componentExists).toBe(true);
  })

  test('Navigation component', ()=>{
    const wrapper=shallow(<App/>);
    const componentExists=wrapper.exists(Navigation);
    expect(componentExists).toBe(true);
  })

  test('Page component', ()=>{
    const wrapper=shallow(<App/>);
    const componentExists=wrapper.exists(Page);
    expect(componentExists).toBe(true);
  })
})

describe('App root div contains: ',()=>{
  test('main tag', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  })

  test('nav tag', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  })

  test('4 child elements',()=>{
    const {container}=render(<App/>);
    expect(container.childNodes.length).toEqual(4);
  })
})

