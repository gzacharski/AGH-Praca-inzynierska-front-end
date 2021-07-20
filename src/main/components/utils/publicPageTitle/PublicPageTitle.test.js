import React from 'react';
import { render, screen } from 'src/testUtils';
import { PublicPageTitle } from './PublicPageTitle';

describe('PublicPageTitle component', () => {
   test('should render properly', () => {
      render(
         <PublicPageTitle header="Test Header" subheader="Test subheader" />,
      );
      expect(screen.getByText('Test Header')).toBeInTheDocument();
      expect(screen.getByText('Test subheader')).toBeInTheDocument();
   });

   test('should render properly with only header provided', () => {
      render(<PublicPageTitle header="Test Header" />);
      expect(screen.getByText('Test Header')).toBeInTheDocument();
   });

   test('should render properly with only subheader provided', () => {
      render(<PublicPageTitle subheader="Test subheader" />);
      expect(screen.getByText('Test subheader')).toBeInTheDocument();
   });

   test('should NOT crash when no data provided', () => {
      render(<PublicPageTitle />);
      expect(screen.queryByText(/%w*/)).not.toBeInTheDocument();
   });
});
