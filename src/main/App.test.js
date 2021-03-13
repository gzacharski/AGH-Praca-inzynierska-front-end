import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme,{shallow} from 'enzyme';
import App from './App';
import {Footer,Header,Navigation,Page} from './layout';
import HeaderRenderer from './renderers/HeaderRenderer';

Enzyme.configure({adapter: new Adapter()});

describe('App renders',()=>{
  test('wihout crashing', ()=>{
    const div=document.createElement('div');
    ReactDOM.render(<App/>,div);
    ReactDOM.unmountComponentAtNode(div);
  })
})

describe('App contains',()=>{
  let wrapper=null;
  
  beforeEach(()=>{
    wrapper=shallow(<App/>);
  })

  test('Footer component', ()=>{
    const componentExists=wrapper.exists(Footer);
    expect(componentExists).toBe(true);
  })

  test('Header component', ()=>{
    const componentExists=wrapper.exists(HeaderRenderer);
    expect(componentExists).toBe(true);
  })

  test('Navigation component', ()=>{
    const componentExists=wrapper.exists(Navigation);
    expect(componentExists).toBe(true);
  })

  test('Page component', ()=>{
    const componentExists=wrapper.exists(Page);
    expect(componentExists).toBe(true);
  })
})

describe('App root div contains:',()=>{
  beforeEach(()=>render(<App />))

  test('main tag', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
  })

  test('nav tag', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  })

  test('div wrapper which contains 4 children',()=>{
    expect(screen.getByTestId('app-container').children.length).toEqual(4);
  })
})

describe('App div root child:',()=>{
  test('is 1 child elements',()=>{
    const {container}=render(<App/>);
    expect(container.childNodes.length).toEqual(1);
  })
})