import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen} from "../../testUtils";
import HeaderRenderer from "./HeaderRenderer";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";

jest.mock("../layout/header/Header", ()=>{
    return function MockHeader(){
        return <div data-testid="header">Header</div>
    }
});

describe("HeaderRenderer", () => {
  let container = null;

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
    ["/","Home page"],
    ["/news","News page"],
    ["/about","About page"],
    ["/contact","Contact Page"],
    ["/*","Another page"]
  ])("should render header if url starts with '%s' (%s)", (link) => {
    act(() => {
      render(
        <MemoryRouter initialEntries={[link]}>
          <HeaderRenderer />
        </MemoryRouter>
      );
    });

    expect(screen.queryByTestId("header")).toBeInTheDocument();
  });

  test.each([
    ["/login","Login page"],
    ["/login/employee","Login page for employees"],
  ])("should not render header if url starts with '%s' (%s)", (link) => {
    act(() => {
        render(
          <MemoryRouter initialEntries={[link]}>
            <HeaderRenderer />
          </MemoryRouter>
        );
      });
      expect(screen.queryByTestId("header")).not.toBeInTheDocument();
  });
});
