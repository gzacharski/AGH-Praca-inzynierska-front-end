import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import Header from "./Header";

Enzyme.configure({ adapter: new Adapter() });

describe("Header renders", () => {
  test("wihout crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Header component',()=>{
    beforeEach(()=>{
      render(<Header/>);
    })

    test('contains tag "header"', () => {
      expect(screen.getByRole('header')).toBeInTheDocument();
    })

    test('contains visible menu icon',()=>{
      expect(screen.getByTestId('header-menu-icon')).toBeInTheDocument();
      expect(screen.getByTestId('header-menu-icon')).toBeVisible();
    })

    test('contains visible title on app bar',()=>{
      expect(screen.getByTestId('header-menu-title')).toBeInTheDocument();
      expect(screen.getByTestId('header-menu-title')).toBeVisible();
    })

    test('contains visible search component',()=>{
      expect(screen.getByRole('search')).toBeInTheDocument();
      expect(screen.getByRole('search')).toBeVisible(); 
    })

    test('contains visible log in button',()=>{
      expect(screen.getByTestId('header-login-button')).toBeInTheDocument();
      expect(screen.getByTestId('header-login-button')).toBeVisible();
    });

    test('contains search input',()=>{
      expect(screen.getByRole('search')).toBeInTheDocument();
    })
})
