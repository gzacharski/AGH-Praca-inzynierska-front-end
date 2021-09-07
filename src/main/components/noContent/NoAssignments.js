import React from 'react';
import { Assignment as AssignmentIcon } from '@material-ui/icons';
import { AbstractNoContent } from './AbstractNoContent';

export const NoAssignments = () => (
   <AbstractNoContent icon={AssignmentIcon} title="Brak przypisanych zadań" />
);
