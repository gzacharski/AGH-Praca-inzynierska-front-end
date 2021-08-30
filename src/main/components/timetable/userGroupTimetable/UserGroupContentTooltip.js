/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Grid, withStyles, Link, Tooltip } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import {
   Room as RoomIcon,
   People as PeopleIcon,
   EmojiPeople as EmojiPeopleIcon,
   ThumbsUpDown as ThumbsUpDownIcon,
} from '@material-ui/icons';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { ParticipantsDialog } from 'src/main/components/dialogs';
import { UserAvatars } from 'src/main/components/avatarGroups';

const style = ({ palette }) => ({
   icon: {
      color: palette.action.active,
   },
   textCenter: {
      textAlign: 'center',
   },
   group: {
      '&:hover': {
         cursor: 'pointer',
      },
   },
});

export const CustomContentTooltip = withStyles(style)(
   ({ appointmentData, classes }) => {
      const {
         location = '',
         trainers = [],
         participants = {},
         rating,
      } = appointmentData || {};
      const { basicList = [] } = participants;

      const [open, setOpen] = useState(false);

      return (
         <>
            <Grid container alignItems="center">
               {location && (
                  <>
                     <Grid item xs={2} className={classes.textCenter}>
                        <Tooltip title="Lokalizacja" placement="bottom" arrow>
                           <RoomIcon className={classes.icon} />
                        </Tooltip>
                     </Grid>
                     <Grid item xs={4}>
                        <Link href="#" color="inherit">
                           {location}
                        </Link>
                     </Grid>
                  </>
               )}
               {rating && (
                  <>
                     <Grid item xs={2} className={classes.textCenter}>
                        <Tooltip
                           title={`Ocena: ${rating}`}
                           placement="bottom"
                           arrow
                        >
                           <ThumbsUpDownIcon className={classes.icon} />
                        </Tooltip>
                     </Grid>
                     <Grid item xs={4}>
                        <Rating
                           name="rating"
                           precision={0.5}
                           value={rating}
                           readOnly
                        />
                     </Grid>
                  </>
               )}
               {trainers.length > 0 && (
                  <>
                     <Grid item xs={2} className={classes.textCenter}>
                        <Tooltip
                           title="Prowadzący zajęcia"
                           placement="bottom"
                           arrow
                        >
                           <EmojiPeopleIcon className={classes.icon} />
                        </Tooltip>
                     </Grid>
                     <Grid item xs={4}>
                        <UserAvatars
                           users={trainers}
                           callback={() => setOpen((prevState) => !prevState)}
                        />
                     </Grid>
                  </>
               )}
               <Grid item xs={2} className={classes.textCenter}>
                  <Tooltip title="Uczestnicy" placement="bottom" arrow>
                     <PeopleIcon className={classes.icon} />
                  </Tooltip>
               </Grid>
               <Grid item xs={4}>
                  <UserAvatars
                     users={basicList}
                     callback={() => setOpen((prevState) => !prevState)}
                  />
               </Grid>
            </Grid>
            <ParticipantsDialog
               users={{ trainers, participants }}
               open={open}
               setOpen={setOpen}
            />
         </>
      );
   },
);

export const UserGroupContentTooltip = withStyles(style)(
   ({ appointmentData, classes, ...restProps }) => (
      <AppointmentTooltip.Content
         {...restProps}
         appointmentData={appointmentData}
      >
         <CustomContentTooltip
            appointmentData={appointmentData}
            classes={classes}
         />
      </AppointmentTooltip.Content>
   ),
);
