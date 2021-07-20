import React from 'react';
import { render, screen } from 'src/testUtils';
import TimetablePage from './TimetablePage';

describe('News component', () => {
   test('should contain proper page', () => {
      render(<TimetablePage />);
      expect(screen.getByText(/Grafik zajęć/)).toBeInTheDocument();
      expect(
         screen.getByText(/Aktualny plan treningów w bieżącym tygodniu/),
      ).toBeInTheDocument();
   });
});
