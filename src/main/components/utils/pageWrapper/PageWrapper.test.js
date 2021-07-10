import React from 'react';
import { render, screen } from 'src/testUtils';
import { PageWrapper } from './PageWrapper';

const TestComponent1 = () => <div>Test Component1</div>;
const TestComponent2 = () => <div>Test Component2</div>;

describe('Page Wrapper', () => {
   test('should render properly', () => {
      render(
         <PageWrapper>
            <TestComponent1 />
            <TestComponent2 />
         </PageWrapper>,
      );

      expect(screen.getByText('Test Component1')).toBeInTheDocument();
      expect(screen.getByText('Test Component2')).toBeInTheDocument();
   });
});
