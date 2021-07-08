import React from 'react';
import {
   Accordion,
   AccordionSummary,
   AccordionDetails,
   FormControlLabel,
   Paper,
   Typography,
} from '@material-ui/core';
import { CheckBox, ExpandMore } from '@material-ui/icons';
import { useStyles } from './ChangeAccountPrivacyForm.styles';

export const ChangeAccountPrivacyForm = () => {
   const classes = useStyles();
   return (
      <Paper className={classes.paper}>
         <Typography component="h2" variant="h5" color="primary" gutterBottom>
            Ustawienia i prywatność konta
         </Typography>
         <div>
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
                     control={<CheckBox />}
                     label="I acknowledge that I should stop the click eve"
                  />
               </AccordionSummary>
               <AccordionDetails>
                  <Typography color="textSecondary">Sample text</Typography>
               </AccordionDetails>
            </Accordion>
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
                     control={<CheckBox />}
                     label="I acknowledge that I should stop the click eve"
                  />
               </AccordionSummary>
               <AccordionDetails>
                  <Typography color="textSecondary">Sample text</Typography>
               </AccordionDetails>
            </Accordion>
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
                     control={<CheckBox />}
                     label="I acknowledge that I should stop the click eve"
                  />
               </AccordionSummary>
               <AccordionDetails>
                  <Typography color="textSecondary">Sample text</Typography>
               </AccordionDetails>
            </Accordion>
         </div>
      </Paper>
   );
};
