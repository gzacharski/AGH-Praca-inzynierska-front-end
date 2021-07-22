import React from 'react';
import { Edit as EditIcon } from '@material-ui/icons';
import { AbstractButton } from './abstractButton/AbstractButton';

const EditIconButton = ({ callback }) => (
   <AbstractButton title="Edytuj" callback={callback}>
      <EditIcon fontSize="large" />
   </AbstractButton>
);

export { EditIconButton };
