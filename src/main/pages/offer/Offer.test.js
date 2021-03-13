import React from "react";
import ReactDOM from "react-dom";
import Offer from "./Offer";
import { render, screen } from "../../../testUtils";

describe("Offer component", () => {
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
    const element = <Offer />;
    ReactDOM.render(element, container);
  });

  test("should contain div with data-testid main-container", () => {
    render(<Offer />);
    expect(screen.queryByTestId("main-container")).toBeInTheDocument();
  });
});
