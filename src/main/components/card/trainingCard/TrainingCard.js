/* eslint-disable no-console */
import React from 'react';
import {
   Avatar,
   Card,
   CardMedia,
   CardContent,
   Typography,
   Box,
   Tooltip,
} from '@material-ui/core';
import { useStyles } from './TrainingCard.styles';

const TrainingCard = ({
   imageSource,
   imageTitle,
   title,
   description,
   trainer,
   trainerAvatar,
}) => {
   const classes = useStyles();
   return (
      <Card
         className={classes.card}
         elevation={10}
         onClick={() => console.log('Card clicked...')}
      >
         <CardMedia
            className={classes.cardMedia}
            image={imageSource}
            title={imageTitle}
            data-testid="background-image"
         />
         <CardContent className={classes.cardContent}>
            <Box className={classes.box}>
               <Typography gutterBottom variant="h5" component="h2">
                  {title}
               </Typography>
               <Tooltip title={trainer}>
                  <Avatar
                     alt={trainer}
                     src={trainerAvatar}
                     data-testid="avatar"
                  />
               </Tooltip>
            </Box>
            <Typography className={classes.typography}>
               {description}
            </Typography>
         </CardContent>
      </Card>
   );
};

export default TrainingCard;
