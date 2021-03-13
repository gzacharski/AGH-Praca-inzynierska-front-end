import React from "react";
import ReactDOM from "react-dom";
import Trenings from "./Trenings";
import { render, screen } from "../../../testUtils";

describe("Trenings component", () => {
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
    const element = <Trenings />;
    ReactDOM.render(element, container);
  });

  test("should contain div with data-testid main-container", () => {
    render(<Trenings />);
    expect(screen.queryByTestId("main-container")).toBeInTheDocument();
  });
});
