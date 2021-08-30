import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   Typography,
} from '@material-ui/core';
import { selectById } from 'src/main/store/sliceFiles/equipmentSlice';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { EquipmentForm } from './forms/EquipmentForm';

export const InfoEquipmentDialog = () => {
   const { dialogState, closeDialog, entityId } = useContext(DialogContext);
   const { INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const selectedRow =
      useSelector((state) => selectById(state, entityId)) || {};
   const {
      equipmentId = '',
      title = '',
      images = [],
      description = '',
   } = selectedRow;

   const shouldOpen = mode === INFO && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog} maxWidth="md">
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Szczegółowe informacje o sprzęcie: {JSON.stringify(selectedRow)}{' '}
               {title}
            </Typography>
         </DialogTitle>
         <DialogContent>
            <EquipmentForm
               title={title}
               description={description}
               image={images?.[0] || ''}
               equipmentId={equipmentId}
               onCloseCallback={closeDialog}
               readOnly
            />
         </DialogContent>
      </Dialog>
   );
};
