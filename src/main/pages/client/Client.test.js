import React from "react";
import ReactDOM from "react-dom";
import Client from "./Client";
import { render, screen } from "../../../testUtils";

describe("Client component", () => {
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
    const element = <Client />;
    ReactDOM.render(element, container);
  });

  test("should contain div with data-testid main-container", () => {
    render(<Client />);
    expect(screen.queryByTestId("main-container")).toBeInTheDocument();
  });
});
