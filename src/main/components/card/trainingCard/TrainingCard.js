import React, { useState } from 'react';
import {
   Avatar,
   Card,
   CardMedia,
   CardContent,
   Typography,
   Box,
   Tooltip,
   Grid,
} from '@material-ui/core';
import { TrainingDetailsDialog } from 'src/main/components/dialogs';
import { useStyles } from './TrainingCard.styles';

const TrainingCard = ({
   image = '',
   title = '',
   description = '',
   trainer = {},
   rating = 2.5,
   duration = '',
   comments = [],
}) => {
   const classes = useStyles();
   const [open, setOpen] = useState(false);

   const { name = '', surname = '', avatar = '' } = trainer;
   const trainerName = `${name} ${surname}`;

   return (
      <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
         <Card
            className={classes.card}
            elevation={10}
            onClick={() => setOpen(true)}
            data-testid="trainingCard"
         >
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
                  <Tooltip title={trainerName}>
                     <Avatar
                        alt={trainerName}
                        src={avatar}
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
            <TrainingDetailsDialog
               open={open}
               setOpen={setOpen}
               image={image}
               title={title}
               description={description}
               trainer={trainer}
               rating={rating}
               duration={duration}
               comments={comments}
            />
         )}
      </Grid>
   );
};

export default TrainingCard;
