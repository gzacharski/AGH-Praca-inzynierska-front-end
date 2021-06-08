/* eslint-disable no-console */
import React, { useState } from 'react';
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
import ShowTrainingsDetails from '../../gallery/showTrainingDetails/ShowTrainingsDetails';

const TrainingCard = ({
   imageSource,
   title,
   description,
   trainer,
   trainerAvatar,
}) => {
   const classes = useStyles();
   const [open, setOpen] = useState(false);

   return (
      <>
         <Card
            className={classes.card}
            elevation={10}
            onClick={() => setOpen(true)}
            data-testid="trainingCard"
         >
            <CardMedia
               className={classes.cardMedia}
               image={`data:image/${imageSource.format};base64, ${imageSource.data}`}
               title={title}
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
                        src={`data:image/${trainerAvatar.format};base64, ${trainerAvatar.data}`}
                        data-testid="avatar"
                     />
                  </Tooltip>
               </Box>
               <Typography className={classes.typography}>
                  {description}
               </Typography>
            </CardContent>
         </Card>
         {open && (
            <ShowTrainingsDetails
               open={open}
               setOpen={setOpen}
               image={imageSource}
               title={title}
               description={description}
               trainer={trainer}
               avatar={trainerAvatar}
            />
         )}
      </>
   );
};

export default TrainingCard;
