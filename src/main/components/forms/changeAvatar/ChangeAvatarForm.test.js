import React from 'react';
import { render, screen } from 'src/testUtils';
import { ChangeAvatarForm } from './ChangeAvatarForm';

describe('Change Avatar Form', () => {
   beforeEach(() => {
      render(<ChangeAvatarForm />);
   });

   test('should have proper title', () => {
      expect(screen.getByText(/Zdjęcie profilowe/)).toBeInTheDocument();
   });
});
