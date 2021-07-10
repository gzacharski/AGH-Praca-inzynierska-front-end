/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Grid, withStyles, Link } from '@material-ui/core';
import { Room } from '@material-ui/icons';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';

const style = ({ palette }) => ({
   icon: {
      color: palette.action.active,
   },
   textCenter: {
      textAlign: 'center',
   },
});

export const ContentTooltip = withStyles(style)(
   ({ appointmentData, classes, ...restProps }) => {
      const { location } = appointmentData;
      return (
         <AppointmentTooltip.Content
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restProps}
            appointmentData={appointmentData}
         >
            {location && (
               <Grid container alignItems="center">
                  <Grid item xs={2} className={classes.textCenter}>
                     <Room className={classes.icon} />
                  </Grid>
                  <Grid item xs={10}>
                     <Link href="#" color="inherit">
                        {location}
                     </Link>
                  </Grid>
               </Grid>
            )}
         </AppointmentTooltip.Content>
      );
   },
);
