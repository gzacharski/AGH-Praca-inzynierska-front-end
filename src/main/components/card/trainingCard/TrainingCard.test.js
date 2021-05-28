import React from 'react';
import { render, screen } from 'src/testUtils';
import TrainingCard from './TrainingCard';

describe('Training card', () => {
   beforeEach(() => {
      render(
         <TrainingCard
            imageSource="test image source"
            imageTitle="test image title"
            trainingTitle="test training title"
            trainingDescription="test training description"
         />,
      );
   });
   test('Should render training title', () => {
      expect(screen.getByText('test training title')).toBeInTheDocument();
   });

   test('Should render training description', () => {
      expect(screen.getByText('test training description')).toBeInTheDocument();
   });

   test('Should contain 2 button', () => {
      expect(screen.queryAllByRole('button').length).toBe(2);
   });

   test('Should contain "Pokaż więcej" button', () => {
      expect(
         screen
            .queryAllByRole('button')
            .filter((button) => button.textContent === 'Pokaż więcej').length,
      ).toBe(1);
   });

   test('Should contain "Dołącz" button', () => {
      expect(
         screen
            .queryAllByRole('button')
            .filter((button) => button.textContent === 'Dołącz').length,
      ).toBe(1);
   });
});
