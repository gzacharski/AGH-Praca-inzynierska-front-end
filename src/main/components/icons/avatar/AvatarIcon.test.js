import React from 'react';
import { screen, render } from 'src/testUtils';
import { testAvatar } from 'src/main/data/testData/testAvatar';
import { AvatarIcon } from './AvatarIcon';

const user = {
   id: 'eba1df78-b210-4cd4-b4c6-a247c71e35cd',
   name: 'Krzysztof',
   surname: 'Nowalski',
};

describe('Avatar icon', () => {
   test('should render', () => {
      render(<AvatarIcon avatar={testAvatar} user={user} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByRole('img').getAttribute('src')).toContain(
         testAvatar.data,
      );
   });

   test('should proper when image date not provided', () => {
      render(<AvatarIcon avatar={{ data: null, format: null }} user={user} />);
      expect(screen.getByText(/KN/)).toBeInTheDocument();
   });
});
