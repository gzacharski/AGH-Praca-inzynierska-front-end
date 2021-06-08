import React from 'react';
import { render, screen } from 'src/testUtils';
import ShowTrainingsDetails from './ShowTrainingsDetails';

describe('Show training details', () => {
   const setOpen = jest.fn();

   beforeEach(() => {
      render(<ShowTrainingsDetails open setOpen={setOpen} />);
   });

   xtest('should render training details', () => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
   });
});
