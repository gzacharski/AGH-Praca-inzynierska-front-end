import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import Navigation from "./Navigation";

Enzyme.configure({ adapter: new Adapter() });

describe("Navigation renders", () => {
  test("wihout crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Navigation/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Navigation component contains:',()=>{
    test('tag nav', () => {
      render(<Navigation/>);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    })
})