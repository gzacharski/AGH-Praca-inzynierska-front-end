import React from 'react';
import { render, screen } from 'src/testUtils';
import PriceListPage from './PriceListPage';

describe('PriceList page component', () => {
   beforeEach(() => {
      render(<PriceListPage />);
   });

   test('should contain proper text', () => {
      expect(screen.getByText(/Oferta karnetów/)).toBeInTheDocument();
   });
});
