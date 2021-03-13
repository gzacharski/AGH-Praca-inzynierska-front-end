import React from "react";
import ReactDOM from "react-dom";
import News from "./News";
import { render, screen } from "../../../testUtils";

describe("News component", () => {
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
    const element = <News />;
    ReactDOM.render(element, container);
  });

  test("should contain div with data-testid main-container", () => {
    render(<News />);
    expect(screen.queryByTestId("main-container")).toBeInTheDocument();
  });
});
