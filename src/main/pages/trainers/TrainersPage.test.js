import React from 'react';
import { render, screen } from 'src/testUtils';
import TrainersPage from './TrainersPage';

describe('Trenings component', () => {
   beforeEach(() => {
      render(<TrainersPage />);
   });

   test('should contain proper text', () => {
      expect(screen.getByText(/Trenerzy/)).toBeInTheDocument();
   });
});
