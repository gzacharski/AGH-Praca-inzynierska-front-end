import React, { useState } from 'react';
import {
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
import { useStyles } from './EquipmentCard.styles';

export const EquipmentCard = ({ title = '', images, description }) => {
   const classes = useStyles();
   const [expand, setExpand] = useState(false);

   const { synopsis = '', full = '' } = description;

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
                  title={title}
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
                     {title}
                  </Typography>
                  <div className={classes.icons}>
                     {Boolean(synopsis) && (
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
                  <Collapse in={expand} timeout={500} collapsedSize={30}>
                     <Typography className={classes.typography}>
                        {synopsis}
                     </Typography>
                  </Collapse>
               )}
               {Boolean(full) && (
                  <Collapse in={expand} timeout={500}>
                     <Typography className={classes.descriptionFull}>
                        {full}
                     </Typography>
                  </Collapse>
               )}
            </CardContent>
         </Card>
      </Grid>
   );
};
