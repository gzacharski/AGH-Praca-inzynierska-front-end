import React, { useState } from 'react';
import {
   Chip,
   Avatar,
   Card,
   CardMedia,
   CardContent,
   Typography,
   Box,
   Tooltip,
   Grid,
   IconButton,
   Collapse,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useStyles } from './TrainerCard.styles';

export const TrainerCard = ({
   name = ' ',
   surname = ' ',
   images,
   avatar,
   description,
}) => {
   const classes = useStyles();

   const history = useHistory();
   const [expand, setExpand] = useState(false);

   const { synopsis = '', trainings = [], full = '' } = description;
   const trainerName = `${name} ${surname}`;

   return (
      <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
         <Card
            className={classes.card}
            elevation={10}
            data-testid="trainingCard"
         >
            {images && images.length > 0 && (
               <CardMedia
                  className={classes.cardMedia}
                  image={images[0]}
                  title={trainerName}
               />
            )}
            <CardContent className={classes.cardContent}>
               <Box className={classes.box}>
                  <Typography
                     gutterBottom
                     variant="h5"
                     component="h2"
                     className={classes.trainerName}
                  >
                     {trainerName}
                  </Typography>
                  <div className={classes.icons}>
                     <div className={classes.icon}>
                        <Tooltip title={trainerName} arrow placement="left">
                           <Avatar alt={trainerName} src={avatar}>
                              {name?.[0]}
                              {surname?.[0]}
                           </Avatar>
                        </Tooltip>
                     </div>
                     {Boolean(full) && (
                        <div className={classes.icon}>
                           <Tooltip
                              title={expand ? 'Pokaż mniej' : 'Pokaż więcej'}
                              arrow
                              placement="bottom"
                           >
                              <IconButton
                                 onClick={() =>
                                    setExpand((prevState) => !prevState)
                                 }
                              >
                                 {expand ? <ExpandLess /> : <ExpandMore />}
                              </IconButton>
                           </Tooltip>
                        </div>
                     )}
                  </div>
               </Box>
               {Boolean(synopsis) && (
                  <Typography className={classes.typography}>
                     {synopsis}
                  </Typography>
               )}
               {Boolean(full) && (
                  <Collapse in={expand} timeout={500}>
                     <Typography className={classes.descriptionFull}>
                        {full}
                     </Typography>
                  </Collapse>
               )}
               {Boolean(trainings) && trainings.length > 0 && (
                  <Grid container spacing={1} className={classes.grid}>
                     {trainings.map((training) => (
                        <Grid item key={training?.trainingId}>
                           <Chip
                              label={training?.title}
                              onClick={() => {
                                 history.push(
                                    `/workouts/${training?.trainingId}`,
                                 );
                              }}
                           />
                        </Grid>
                     ))}
                  </Grid>
               )}
            </CardContent>
         </Card>
      </Grid>
   );
};
