/* eslint-disable no-console */
import React from 'react';
import {
   Button,
   Card,
   CardMedia,
   CardContent,
   CardActions,
   Typography,
} from '@material-ui/core';
import { useStyles } from './TrainingCard.styles';

const TrainingCard = ({
   imageSource,
   imageTitle,
   trainingTitle,
   trainingDescription,
}) => {
   const classes = useStyles();
   return (
      <Card className={classes.card}>
         <CardMedia
            className={classes.cardMedia}
            image={imageSource}
            title={imageTitle}
         />
         <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
               {trainingTitle}
            </Typography>
            <Typography>{trainingDescription}</Typography>
         </CardContent>
         <CardActions>
            <Button
               size="small"
               color="primary"
               onClick={() => console.log('Kliknięto pokaż więcej')}
            >
               Pokaż więcej
            </Button>
            <Button
               size="small"
               color="primary"
               onClick={() => console.log('Kliknięto dołącz')}
            >
               Dołącz
            </Button>
         </CardActions>
      </Card>
   );
};

export default TrainingCard;
