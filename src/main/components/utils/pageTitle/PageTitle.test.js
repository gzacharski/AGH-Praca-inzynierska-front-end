import React from 'react';
import { render, screen } from 'src/testUtils';
import { PageTitle } from './PageTitle';

describe('PageTitle component', () => {
   test('should render properly', () => {
      render(<PageTitle>Test page title</PageTitle>);
      expect(screen.getByText('Test page title')).toBeInTheDocument();
   });
});
