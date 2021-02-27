import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import Footer from "./Footer";

Enzyme.configure({ adapter: new Adapter() });

describe("Footer renders ", () => {
  test("wihout crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Footer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Footer component contains: ',()=>{
    test('text "footer"', () => {
      render(<Footer />);
      expect(screen.getByText('Footer')).toBeInTheDocument();
    })
})