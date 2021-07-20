import React from 'react';
import { render, screen } from 'src/testUtils';
import Statistics from './StatisticsPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<Statistics />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Statystyki')).toBeInTheDocument();
   });
});
