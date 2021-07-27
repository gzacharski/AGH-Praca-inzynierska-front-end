import React from 'react';
import clsx from 'clsx';
import {
   Grid,
   Paper,
   Typography,
   IconButton,
   Tooltip,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useStyles } from './NotificationItem.styles';

export const NotificationItem = ({
   title = '',
   content = '',
   created = '',
   from = {},
   markAsRead = false,
   markAsReadCallback,
   deleteCallback,
}) => {
   const classes = useStyles();
   const { name = '', surname = '' } = from;

   let createdFromNow;
   try {
      createdFromNow = formatDistanceToNow(Date.parse(created), {
         locale: pl,
         addSuffix: true,
      });
   } catch (error) {
      createdFromNow = '';
   }

   return (
      <Grid item xs={10} md={8} lg={6}>
         <Paper
            className={clsx(classes.root, {
               [classes.rootMarkAsRead]: markAsRead,
            })}
            elevation={6}
            onClick={markAsReadCallback}
         >
            <div className={classes.body}>
               <div className={classes.header}>
                  <Typography variant="h6" className={classes.title}>
                     {title}
                  </Typography>
                  <div>
                     <Tooltip
                        title="Usuń powiadomienie"
                        arrow
                        placement="bottom"
                     >
                        <IconButton
                           onClick={deleteCallback}
                           aria-label="delete notification"
                        >
                           <DeleteIcon />
                        </IconButton>
                     </Tooltip>
                  </div>
               </div>
               <Typography
                  variant="body2"
                  className={classes.time}
               >{`${name} ${surname}, ${createdFromNow}`}</Typography>
               <Typography variant="body1" className={classes.content}>
                  {content}
               </Typography>
            </div>
         </Paper>
      </Grid>
   );
};
