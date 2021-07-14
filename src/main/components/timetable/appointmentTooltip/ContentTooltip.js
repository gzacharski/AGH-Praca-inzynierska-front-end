/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
   Grid,
   withStyles,
   Link,
   Avatar,
   Tooltip,
   Typography,
   makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { AvatarGroup } from '@material-ui/lab';
import {
   Room as RoomIcon,
   People as PeopleIcon,
   EmojiPeople as EmojiPeopleIcon,
} from '@material-ui/icons';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { ParticipantsDialog } from 'src/main/components/dialogs';

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

const useStyles = makeStyles({
   group: {
      '&:hover': {
         cursor: 'pointer',
      },
   },
});

const UserAvatars2 = ({ users, setOpen }) => {
   const classes = useStyles();
   return users && users.length > 0 ? (
      <AvatarGroup
         max={4}
         spacing="small"
         onClick={() => Boolean(users) && setOpen((prevState) => !prevState)}
         className={clsx({
            [classes.group]: Boolean(users),
         })}
      >
         {users.map((user) => {
            const {
               name = ' ',
               surname = ' ',
               avatar = '',
               userId = '',
            } = user;
            return (
               <Tooltip
                  key={userId}
                  title={`${name} ${surname}`}
                  placement="bottom"
                  arrow
               >
                  <Avatar alt={`${name} ${surname}`} src={avatar}>
                     {`${name[0]}${surname[0]}`}
                  </Avatar>
               </Tooltip>
            );
         })}
      </AvatarGroup>
   ) : (
      <Typography>Brak uczestników. Zapisz się pierwszy.</Typography>
   );
};

export const ContentTooltip = withStyles(style)(
   ({ appointmentData, classes, ...restProps }) => {
      const { location = '', trainers = [], partipants = {} } = appointmentData;
      const { basicList = [] } = partipants;

      const [open, setOpen] = useState(false);

      return (
         <AppointmentTooltip.Content
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restProps}
            appointmentData={appointmentData}
         >
            <>
               <Grid container alignItems="center">
                  {location && (
                     <>
                        <Grid item xs={2} className={classes.textCenter}>
                           <Tooltip
                              title="Lokalizacja"
                              placement="bottom"
                              arrow
                           >
                              <RoomIcon className={classes.icon} />
                           </Tooltip>
                        </Grid>
                        <Grid item xs={10}>
                           <Link href="#" color="inherit">
                              {location}
                           </Link>
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
                        <Grid item xs={10}>
                           <UserAvatars2 users={trainers} setOpen={setOpen} />
                        </Grid>
                     </>
                  )}
                  <Grid item xs={2} className={classes.textCenter}>
                     <Tooltip title="Uczestnicy" placement="bottom" arrow>
                        <PeopleIcon className={classes.icon} />
                     </Tooltip>
                  </Grid>
                  <Grid item xs={10}>
                     <UserAvatars2 users={basicList} setOpen={setOpen} />
                  </Grid>
               </Grid>
               <ParticipantsDialog
                  users={{ trainers, partipants }}
                  open={open}
                  setOpen={setOpen}
               />
            </>
         </AppointmentTooltip.Content>
      );
   },
);
