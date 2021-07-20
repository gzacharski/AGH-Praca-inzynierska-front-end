import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import EquipmentPage from './EquipmentPage';

describe('Equipment page component', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <EquipmentPage />
         </MemoryRouter>,
      );
   });

   test('should contain proper text', () => {
      expect(screen.getByText(/Sprzęt treningowy/)).toBeInTheDocument();
      expect(
         screen.getByText(
            /Odpowiedni dobór sprzętu fitness poprawia efektywność Twoich treningów/,
         ),
      ).toBeInTheDocument();
   });
});
