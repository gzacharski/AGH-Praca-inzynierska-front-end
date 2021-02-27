import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import Header from "./Header";

Enzyme.configure({ adapter: new Adapter() });

describe("Header renders ", () => {
  test("wihout crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Header component contains: ',()=>{
    test('text "Header"', () => {
      render(<Header/>);
      expect(screen.getByText('Header')).toBeInTheDocument();
    })
})
