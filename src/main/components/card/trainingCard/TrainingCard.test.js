import React from 'react';
import { render, screen } from 'src/testUtils';
import TrainingCard from './TrainingCard';

describe('Training card', () => {
   beforeEach(() => {
      render(
         <TrainingCard
            imageSource="test image source"
            title="test training title"
            description="test training description"
            trainer="Test trainer"
            trainerAvatar="Trainer avatar"
         />,
      );
   });
   test('Should render training title', () => {
      expect(screen.getByText('test training title')).toBeInTheDocument();
   });

   test('Should render training description', () => {
      expect(screen.getByText('test training description')).toBeInTheDocument();
   });

   test('Should render background image', () => {
      expect(screen.getByTestId('background-image')).toBeInTheDocument();
   });

   test('Should render trainer avatar', () => {
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
   });

   xtest('when card clicked, it should render backdrop', () => {});
});
