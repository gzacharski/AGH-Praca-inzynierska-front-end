import React from 'react';
import { Save as SaveIcon } from '@material-ui/icons';
import { AbstractButton } from './abstractButton/AbstractButton';

const SaveIconButton = ({ callback, editable }) => (
   <AbstractButton
      title="Zapisz zmiany"
      callback={callback}
      editable={editable}
   >
      <SaveIcon fontSize="large" />
   </AbstractButton>
);

export { SaveIconButton };
