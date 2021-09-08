import React from 'react';
import {
   Avatar,
   Backdrop,
   Box,
   Card,
   CardMedia,
   CardContent,
   Tooltip,
   Typography,
   IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useStyles } from './TrainingDetailsDialog.style';

const TrainingDetailsDialog = ({
   open,
   setOpen,
   image,
   title,
   description,
   trainer,
}) => {
   const classes = useStyles();
   const { name = '', surname = '', avatar = '' } = trainer || {};

   return (
      <Backdrop
         className={classes.backdrop}
         open={open}
         data-testid="backdropcard"
      >
         <Card className={classes.card}>
            <IconButton
               className={classes.close}
               aria-label="Close"
               onClick={() => setOpen(false)}
               data-testid="close-button"
            >
               <Close />
            </IconButton>
            <CardMedia
               className={classes.cardMedia}
               image={image}
               title={title}
               data-testid="background-image"
            />
            <CardContent className={classes.cardContent}>
               <Box className={classes.box}>
                  <Typography gutterBottom variant="h5" component="h2">
                     {title}
                  </Typography>
                  {trainer && (
                     <Box className={classes.box}>
                        <Typography className={classes.typography}>
                           Prowadzący:
                        </Typography>
                        <Tooltip
                           title={`${name} ${surname}`}
                           arrow
                           placement="bottom"
                        >
                           <Avatar
                              alt={`${name} ${surname}`}
                              src={avatar}
                              data-testid="avatar"
                           >
                              `${name[0]}${surname[0]}`
                           </Avatar>
                        </Tooltip>
                     </Box>
                  )}
               </Box>
               <Typography className={classes.description}>
                  {description}
               </Typography>
            </CardContent>
         </Card>
      </Backdrop>
   );
};

export default TrainingDetailsDialog;
