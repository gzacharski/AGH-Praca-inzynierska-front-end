import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "../../../testUtils";
import Header from "./Header";

describe("Header component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  test('contains tag "header"', () => {
    expect(screen.getByRole("header")).toBeInTheDocument();
  });

  test("contains visible menu icon", () => {
    expect(screen.getByTestId("header-menu-icon")).toBeInTheDocument();
    expect(screen.getByTestId("header-menu-icon")).toBeVisible();
  });

  test("contains visible title on app bar", () => {
    expect(screen.getByTestId("header-menu-title")).toBeInTheDocument();
    expect(screen.getByTestId("header-menu-title")).toBeVisible();
  });

  test("contains visible search component", () => {
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByRole("search")).toBeVisible();
  });

  test("contains visible log in button", () => {
    expect(screen.getByTestId("header-login-button")).toBeInTheDocument();
    expect(screen.getByTestId("header-login-button")).toBeVisible();
  });

  test("contains search input", () => {
    expect(screen.getByRole("search")).toBeInTheDocument();
  });
});
