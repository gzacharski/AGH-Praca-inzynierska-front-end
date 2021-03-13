import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "../../../testUtils";
import Blog from "./Blog";

describe("Blog component", () => {
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
    const element = <Blog />;
    ReactDOM.render(element, container);
  });

  test("should contain div with data-testid main-container", () => {
    render(<Blog />);
    expect(screen.queryByTestId("main-container")).toBeInTheDocument();
  });
});
