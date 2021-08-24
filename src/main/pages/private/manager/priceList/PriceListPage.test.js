import React from 'react';
import { render, screen } from 'src/testUtils';
import PriceListPage from './PriceListPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<PriceListPage />);
   });

   xtest('should contain ', () => {
      expect(screen.getByText('Modyfikuj ofertę')).toBeInTheDocument();
   });
});
