import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import { TrainerCard } from './TrainerCard';
import { testData } from './testData';

describe('TrainerCard', () => {
   test('should render properly', () => {
      const { avatar, description, images, name, surname } = testData[0];
      render(
         <MemoryRouter>
            <TrainerCard
               avatar={avatar}
               description={description}
               images={images}
               name={name}
               surname={surname}
            />
         </MemoryRouter>,
      );

      expect(screen.getByText('Redford Bowdry')).toBeInTheDocument();

      expect(screen.getByText('Trening personalny')).toBeInTheDocument();
      expect(screen.getByText('TRX')).toBeInTheDocument();

      expect(
         screen.getByText(
            'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
         ),
      ).toBeInTheDocument();
   });
});
