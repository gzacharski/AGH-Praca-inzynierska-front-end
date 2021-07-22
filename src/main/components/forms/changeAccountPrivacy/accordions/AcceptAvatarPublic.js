import React from 'react';
import {
   Accordion,
   Checkbox,
   AccordionSummary,
   AccordionDetails,
   FormControlLabel,
   Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export const AcceptAvatarPublic = ({
   avatarAgreement,
   setAvatarAgreement,
   disabled,
}) => (
   <Accordion>
      <AccordionSummary
         expandIcon={<ExpandMore />}
         aria-label="Expand"
         aria-controls="additional-actions-content"
         id="additional-actions1-header"
      >
         <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={
               <Checkbox
                  disabled={disabled}
                  color="primary"
                  checked={avatarAgreement}
                  onClick={() => setAvatarAgreement(!avatarAgreement)}
               />
            }
            label="Akceptuję wyświetlanie podstawowych informacji o koncie w serwisie."
         />
      </AccordionSummary>
      <AccordionDetails>
         <Typography color="textSecondary">
            Twoje zdjęcie profilowe i podstawowe informacje będą wyświetlane w
            serwisie. W przeciwnym wypadku Twoje konto zostanie wyświetlone jako
            anonimowe.
         </Typography>
      </AccordionDetails>
   </Accordion>
);
