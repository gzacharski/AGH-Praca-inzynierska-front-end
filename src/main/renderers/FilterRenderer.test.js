import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "../../testUtils";
import FilterRenderer from "./FilterRenderer";

const TestComponent = () => <div data-testid="test-component">Component</div>;

describe("FilterRenderer", () => {
  let container = null;
  const filteredUrls = ['/login', '/sign-up'];

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test.each([
    ["/", "Home page"],
    ["/news", "News page"],
    ["/about", "About page"],
    ["/contact", "Contact Page"],
    ["/*", "Another page"],
  ])("should render header if url starts with '%s' (%s)", (link) => {
    act(() => {
      render(
        <MemoryRouter initialEntries={[link]}>
          <FilterRenderer urls={filteredUrls}>
            <TestComponent />
          </FilterRenderer>
        </MemoryRouter>
      );
    });

    expect(screen.queryByTestId("test-component")).toBeInTheDocument();
  });

  test.each([
    ["/login", "Login page"],
    ["/login/employee", "Login page for employees"],
  ])("should not render header if url starts with '%s' (%s)", (link) => {
    act(() => {
      render(
        <MemoryRouter initialEntries={[link]}>
          <FilterRenderer urls={filteredUrls}>
            <TestComponent />
          </FilterRenderer>
        </MemoryRouter>
      );
    });
    expect(screen.queryByTestId("test-component")).not.toBeInTheDocument();
  });
});
