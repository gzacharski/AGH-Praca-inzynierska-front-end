import React from "react";
import ReactDOM from "react-dom";
import About from "./About";
import { render, screen } from "../../../testUtils";

describe("About component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("should render", () => {
    const element = <About />;
    ReactDOM.render(element, container);
  });

  test("should contain div with data-testid main-container", () => {
    render(<About />);
    expect(screen.queryByTestId("main-container")).toBeInTheDocument();
  });
});
