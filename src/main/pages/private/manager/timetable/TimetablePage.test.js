import React from 'react';
import { render, screen } from 'src/testUtils';
import TimetablePage from './TimetablePage';

describe('News component', () => {
   beforeEach(() => {
      render(<TimetablePage />);
   });
   xtest('should contain proper page', () => {
      expect(
         screen.getByText('Aktualny grafik zajęć (manager)'),
      ).toBeInTheDocument();
   });
});
