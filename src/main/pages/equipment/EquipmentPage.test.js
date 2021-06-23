import React from "react";
import { render, screen } from "src/testUtils";
import EquipmentPage from "./EquipmentPage";

describe("Equipment page component", () => {

  beforeEach(() => {
    render(<EquipmentPage/>);
  });

  test("should contain proper text", () => {
    expect(screen.getByText(/Sprzęt treningowy/)).toBeInTheDocument();
  });
});
