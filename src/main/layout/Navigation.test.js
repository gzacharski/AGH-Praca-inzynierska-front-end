import React from "react";
import { render, screen } from '../../testUtils';
import Navigation from "./Navigation";

describe('Navigation component contains:', () => {
  test('tag nav', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  })
})