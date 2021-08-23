import React from 'react';
import { render, screen } from 'src/testUtils';
import StatisticsPage from './StatisticsPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<StatisticsPage />);
   });

   xtest('should contain ', () => {
      expect(screen.getByText('Statystyki administratora')).toBeInTheDocument();
   });
});
