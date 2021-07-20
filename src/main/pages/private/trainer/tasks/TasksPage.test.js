import React from 'react';
import { render, screen } from 'src/testUtils';
import TasksPage from './TasksPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<TasksPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Przydziel zadania')).toBeInTheDocument();
   });
});
