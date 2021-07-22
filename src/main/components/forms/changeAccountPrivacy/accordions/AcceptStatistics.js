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

export const AcceptStatistics = ({
   statsAgreement,
   setStatsAgreement,
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
                  checked={statsAgreement}
                  onClick={() => setStatsAgreement(!statsAgreement)}
                  color="primary"
               />
            }
            label="Akceptuje wyświetlanie statystyk na temat konta."
         />
      </AccordionSummary>
      <AccordionDetails>
         <Typography color="textSecondary">
            Twoje statystyki będą dostępne dla innych użytkowników.
         </Typography>
      </AccordionDetails>
   </Accordion>
);
