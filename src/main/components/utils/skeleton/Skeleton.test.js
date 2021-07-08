import React from 'react';
import { render, screen } from 'src/testUtils';
import { Skeleton } from './Skeleton';

const TestComponent = () => <div>Test Component</div>;

describe('Skeleton', () => {
   test('should render with skeleton', () => {
      render(
         <Skeleton>
            <TestComponent />
         </Skeleton>,
      );
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
   });

   test('should not render with skeleton', () => {
      render(
         <Skeleton render>
            <TestComponent />
         </Skeleton>,
      );
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
   });
});
