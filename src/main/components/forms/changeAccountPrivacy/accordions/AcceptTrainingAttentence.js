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

export const AcceptTrainingAttentence = ({
   trainingAgreement,
   setTrainingAgreement,
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
                  checked={trainingAgreement}
                  onClick={() => setTrainingAgreement(!trainingAgreement)}
                  color="primary"
               />
            }
            label="Akceptuje wyświetlanie udziału w treningach."
         />
      </AccordionSummary>
      <AccordionDetails>
         <Typography color="textSecondary">
            Twoje zdjęcie profilowe i podstawowe informacje będą wyświetlane
            przy zajęciach grupowych w których bierzesz udział. W przeciwnym
            wypadku Twoje konto zostanie wyświetlone jako anonimowe.
         </Typography>
      </AccordionDetails>
   </Accordion>
);
