import React from 'react';
import { render, screen } from 'src/testUtils';
import ConfigurePage from './ConfigurePage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<ConfigurePage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Konfiguruj')).toBeInTheDocument();
   });
});
