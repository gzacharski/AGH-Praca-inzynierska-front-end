import React from 'react';
import { render, screen } from 'src/testUtils';
import TrainersPage from './TrainersPage';

describe('Trenings component', () => {
   test('should contain proper text', () => {
      render(<TrainersPage />);
      expect(screen.getByText(/Nasi trenerzy/)).toBeInTheDocument();
      expect(
         screen.getByText(/Dowiedz się więcej o prowadzących zajęcia fitness/),
      ).toBeInTheDocument();
   });
});
