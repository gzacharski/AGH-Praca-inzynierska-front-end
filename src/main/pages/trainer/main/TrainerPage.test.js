import React from 'react';
import { render, screen } from 'src/testUtils';
import TrainerPage from './TrainerPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<TrainerPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Strona trenera')).toBeInTheDocument();
   });
});
