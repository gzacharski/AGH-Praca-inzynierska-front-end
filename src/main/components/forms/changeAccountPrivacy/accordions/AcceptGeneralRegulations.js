import React from 'react';
import {
   Accordion,
   Checkbox,
   AccordionSummary,
   AccordionDetails,
   FormControlLabel,
   Typography,
   makeStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles({
   accordionDetails: {
      alignContent: 'center',
      flexDirection: 'column',
   },
   paragraph: {
      margin: '5px',
   },
});

export const AcceptGeneralRegulations = ({
   regulationsAgreement,
   setRegulationsAgreement,
   disabled,
}) => {
   const classes = useStyles();
   return (
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
                     checked={regulationsAgreement}
                     onClick={() =>
                        setRegulationsAgreement(!regulationsAgreement)
                     }
                  />
               }
               label="Akceptuję regulamin klubu fitness."
            />
         </AccordionSummary>
         <AccordionDetails className={classes.accordionDetails}>
            <Typography
               variant="h4"
               color="textSecondary"
               className={classes.paragraph}
            >
               Regulamin klubu
            </Typography>
            <Typography
               variant="body1"
               color="textSecondary"
               className={classes.paragraph}
               paragraph
            >
               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
               Curabitur sollicitudin magna purus, at sodales nisi efficitur id.
               Mauris vulputate sed lacus vitae vulputate. Praesent at ipsum vel
               magna ullamcorper vestibulum in a lectus. Pellentesque id sodales
               erat. Ut tincidunt pulvinar nulla, vitae consectetur risus
               dignissim sed. Sed pulvinar tempus quam, vitae pulvinar turpis
               elementum ac. Donec venenatis massa quis quam iaculis, in
               hendrerit nunc consequat. Sed condimentum ultricies tellus, ac
               vulputate sapien pharetra vel. Vestibulum nibh justo, efficitur
               id convallis at, laoreet id purus. Vivamus ut nibh ac libero
               bibendum luctus. Curabitur vehicula feugiat bibendum. Nulla
               pulvinar enim eu enim rhoncus rutrum.
            </Typography>
            <Typography
               variant="body1"
               color="textSecondary"
               className={classes.paragraph}
               paragraph
            >
               Phasellus suscipit sem at leo vestibulum, nec hendrerit quam
               condimentum. Cras porta nunc non leo laoreet lobortis. Phasellus
               venenatis iaculis magna at porttitor. Morbi quis nulla a ante
               molestie iaculis. Donec ut nisi sagittis, egestas sem finibus,
               euismod purus. Fusce ut tempus lectus. Maecenas elit elit,
               pharetra non interdum nec, pulvinar et eros. Curabitur turpis
               felis, iaculis at dolor id, lobortis volutpat diam. Proin quis
               dolor blandit magna elementum fermentum eget quis justo. Nunc
               tempor aliquet ex, at vulputate felis cursus et. Duis blandit
               sollicitudin lectus ut tincidunt. Lorem ipsum dolor sit amet,
               consectetur adipiscing elit. Pellentesque urna sem, lacinia vitae
               finibus at, mattis maximus tellus. Nunc et erat quis lacus porta
               condimentum. Pellentesque id erat sagittis, luctus lectus ut,
               vulputate leo.
            </Typography>
            <Typography
               color="textSecondary"
               className={classes.paragraph}
               paragraph
            >
               Duis vulputate odio quis augue gravida mollis. Quisque arcu
               lectus, rhoncus et risus et, dignissim facilisis tortor.
               Suspendisse potenti. Maecenas et blandit urna. Aenean consectetur
               congue faucibus. Vestibulum vulputate dolor at iaculis imperdiet.
               Suspendisse tempor, tortor at lacinia porta, erat enim euismod
               neque, eget mattis nulla augue non dolor. Nulla eu scelerisque
               ante. In ut iaculis diam. Maecenas malesuada mauris in nibh
               ornare, ut finibus justo ullamcorper. Integer malesuada aliquam
               magna, in dignissim turpis finibus eu. In semper augue quis nibh
               viverra, id mollis massa aliquet. Suspendisse potenti. Morbi
               scelerisque, est eget dapibus mattis, magna nulla facilisis
               lacus, a volutpat sem est vel massa. Vestibulum vestibulum eget
               arcu id tempor.
            </Typography>
         </AccordionDetails>
      </Accordion>
   );
};
