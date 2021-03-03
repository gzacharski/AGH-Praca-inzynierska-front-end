import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import Page from "./Page";

Enzyme.configure({ adapter: new Adapter() });

describe("Page component renders", () => {
  test("wihout crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Page/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Page component contains:',()=>{
    test('element with testId equals main-container', () => {
      render(<Page />);
      expect(screen.getByTestId('main-container')).toBeInTheDocument();
    })

    test('tag "main"', () => {
        render(<Page />);
        expect(screen.getByRole('main')).toBeInTheDocument();
      })
})