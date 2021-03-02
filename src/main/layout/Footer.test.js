import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import Footer from "./Footer";

Enzyme.configure({ adapter: new Adapter() });

describe("Footer renders", () => {
  test("wihout crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Footer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Footer component',()=>{
    beforeEach(()=>{
      render(<Footer/>);
    })

    test('contains testId equal footer-container.',()=>{
      expect(screen.getByTestId('footer-container')).toBeInTheDocument();
      expect(screen.getByTestId('footer-container')).toBeVisible();
    })

    test('contains title.',()=>{
      expect(screen.getByTestId('footer-title')).toBeInTheDocument();
      expect(screen.getByTestId('footer-title')).toBeVisible();
    })

    test.each([
      'System do wspomagania zarządzania placówką profilaktyki zdrowotnej'
    ])('title is %s',(expectedTitle)=>{
      expect(screen.getByTestId('footer-title').textContent).toBe(expectedTitle);
    })

    test('contains authors.',()=>{
      expect(screen.getByTestId('footer-authors')).toBeInTheDocument();
    })

    test.each([
      'Bartosz Kordek',
      'Grzegorz Zacharski'
    ])('contains author %s.',(author)=>{
      expect(screen.getByTestId('footer-authors')).toHaveTextContent(author);
      expect(screen.getByTestId('footer-authors')).toBeVisible();
    })
})