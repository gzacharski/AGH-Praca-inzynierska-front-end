/* eslint-disable react/jsx-props-no-spreading */
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
import { AvatarGroup, Rating } from '@material-ui/lab';
import {
   Room as RoomIcon,
   People as PeopleIcon,
   EmojiPeople as EmojiPeopleIcon,
   ThumbsUpDown as ThumbsUpDownIcon,
} from '@material-ui/icons';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { ParticipantsDialog } from 'src/main/components/dialogs';
import { useAuth } from 'src/main/auth';
import {} from "src/main/utils"

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

const useStyles = makeStyles((theme) => ({
   group: {
      '&:hover': {
         cursor: 'pointer',
      },
   },
   grid: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
   },
}));

const UserAvatars = ({ users, setOpen }) => {
   const classes = useStyles();
   const { isAuthenticated } = useAuth();
   return users && users.length > 0 ? (
      <AvatarGroup
         max={4}
         spacing="small"
         onClick={() =>
            Boolean(users) &&
            isAuthenticated() &&
            setOpen((prevState) => !prevState)
         }
         className={clsx({
            [classes.group]: Boolean(users) && isAuthenticated(),
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
      <Typography>Brak uczestników.</Typography>
   );
};

export const PublicContentTooltip = withStyles(style)(
   ({ appointmentData, classes, ...restProps }) => {
      const {
         location = '',
         trainers = [],
         partipants = {},
         rating,
      } = appointmentData;
      const { basicList = [] } = partipants;

      const [open, setOpen] = useState(false);
      const { isAuthenticated } = useAuth();

      return (
         <AppointmentTooltip.Content
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
                        <Grid item xs={4}>
                           <Link href="#" color="inherit">
                              {location}
                           </Link>
                        </Grid>
                     </>
                  )}
                  {isAuthenticated() && rating && (
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
                           <UserAvatars users={trainers} setOpen={setOpen} />
                        </Grid>
                     </>
                  )}
                  {isAuthenticated() && (
                     <>
                        <Grid item xs={2} className={classes.textCenter}>
                           <Tooltip title="Uczestnicy" placement="bottom" arrow>
                              <PeopleIcon className={classes.icon} />
                           </Tooltip>
                        </Grid>
                        <Grid item xs={4}>
                           <UserAvatars users={basicList} setOpen={setOpen} />
                        </Grid>
                     </>
                  )}
               </Grid>
               {isAuthenticated() && (
                  <ParticipantsDialog
                     users={{ trainers, partipants }}
                     open={open}
                     setOpen={setOpen}
                  />
               )}
            </>
         </AppointmentTooltip.Content>
      );
   },
);
