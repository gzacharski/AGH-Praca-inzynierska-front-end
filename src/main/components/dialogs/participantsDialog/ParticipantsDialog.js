import React from 'react';
import {
   Avatar,
   Dialog,
   DialogTitle,
   DialogContent,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Typography,
   IconButton,
   Badge,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useStyles } from './ParticipantsDialog.styles';

const UserListItem = ({ user, isTrainer }) => {
   const { name = ' ', surname = ' ', avatar = '' } = user;
   return (
      <ListItem>
         <ListItemAvatar>
            <Avatar alt={`${name} ${surname}`} src={avatar}>
               {`${name[0]}${surname[0]}`}
            </Avatar>
         </ListItemAvatar>
         <ListItemText
            primary={`${name} ${surname}`}
            secondary={isTrainer && 'Trener'}
         />
      </ListItem>
   );
};

export const TrainerList = ({ trainers }) =>
   trainers && trainers.length > 0 ? (
      <List>
         {trainers.map((trainer) => (
            <UserListItem key={trainer?.userId} user={trainer} isTrainer />
         ))}
      </List>
   ) : (
      <Typography>Brak przypisanego trenera</Typography>
   );

export const ParticipantList = ({ users, title }) => (
   <div>
      <Badge color="secondary" badgeContent={users && users.length}>
         <Typography>{title}</Typography>
      </Badge>
      {users && users.length > 0 ? (
         <List>
            {users.map((user) => (
               <UserListItem key={user?.userId} user={user} />
            ))}
         </List>
      ) : (
         <Typography>Brak osób na liście</Typography>
      )}
   </div>
);

export const ParticipantsDialog = ({ users, open, setOpen }) => {
   const classes = useStyles();
   const { trainers = [] } = users;
   const { basicList = [], reserveList = [] } = users?.partipants;
   return (
      <Dialog
         open={open}
         onClose={() => setOpen((prevState) => !prevState)}
         data-testid="dialog"
      >
         <DialogTitle disableTypography>
            <Typography variant="h6">Uczestnicy</Typography>
            <IconButton
               aria-label="close"
               className={classes.closeButton}
               onClick={() => setOpen((prevState) => !prevState)}
            >
               <CloseIcon />
            </IconButton>
         </DialogTitle>
         <DialogContent dividers>
            <TrainerList trainers={trainers} />
            <div className={classes.dialog}>
               <ParticipantList users={basicList} title="Lista podstawowa" />
               <ParticipantList users={reserveList} title="Lista rezerwowa" />
            </div>
         </DialogContent>
      </Dialog>
   );
};
