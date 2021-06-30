import React from 'react';
import { render, screen } from 'src/testUtils';
import Help from './Help';

describe('Help component', () => {
   beforeEach(() => {
      render(<Help />);
   });

   test('should render', () => {
      expect(screen.getByText('Pomoc')).toBeInTheDocument();
   });
});
