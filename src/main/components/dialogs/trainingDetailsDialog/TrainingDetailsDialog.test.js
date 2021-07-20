import React from 'react';
import { render, screen } from 'src/testUtils';
import TrainingDetailsDialog from './TrainingDetailsDialog';

describe('Show training details', () => {
   const setOpen = jest.fn();
   const image = {
      data: 'https://source.unsplash.com/random',
      format: 'jpeg',
   };

   beforeEach(() => {
      render(
         <TrainingDetailsDialog
            open
            setOpen={setOpen}
            image="test image source"
            title="test training title"
            description="test training description"
            trainer="Test trainer"
            avatar={image}
         />,
      );
   });

   test('should render.', () => {
      expect(screen.getByTestId('backdropcard')).toBeInTheDocument();
   });

   test('should have close button.', () => {
      expect(screen.getByTestId('close-button')).toBeInTheDocument();
   });

   test('should render training title.', () => {
      expect(screen.getByText('test training title')).toBeInTheDocument();
   });

   test('should render training description.', () => {
      expect(screen.getByText('test training description')).toBeInTheDocument();
   });

   test('should render background image.', () => {
      expect(screen.getByTestId('background-image')).toBeInTheDocument();
   });

   test('should render trainer avatar.', () => {
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
   });

   test('should "Sprawdź grafik" button', () => {
      expect(screen.getByText('Sprawdź grafik')).toBeInTheDocument();
   });

   test('should "Dołącz" button', () => {
      expect(screen.getByTestId('check-button')).toBeInTheDocument();
   });

   test('should "Dołącz" button', () => {
      expect(screen.getByTestId('join-button')).toBeInTheDocument();
   });
});
