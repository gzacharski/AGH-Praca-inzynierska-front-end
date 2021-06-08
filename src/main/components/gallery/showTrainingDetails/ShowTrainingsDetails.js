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
   Button,
   CardActionArea,
   IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useStyles } from './ShowTrainingsDetails.style';

const ShowTrainingsDetails = ({
   open,
   setOpen,
   image,
   title,
   description,
   trainer,
   avatar,
}) => {
   const classes = useStyles();

   return (
      <Backdrop className={classes.backdrop} open={open}>
         <Card className={classes.card}>
            <IconButton
               className={classes.close}
               aria-label="Close"
               onClick={() => setOpen(false)}
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
                  <Box className={classes.box}>
                     <Typography>Prowadzący:</Typography>
                     <Tooltip title={trainer}>
                        <Avatar
                           alt={trainer}
                           src={avatar}
                           data-testid="avatar"
                        />
                     </Tooltip>
                  </Box>
               </Box>
               <Typography className={classes.description}>
                  {description}
               </Typography>
            </CardContent>
            <CardActionArea className={classes.button}>
               <Button variant="contained" color="primary">
                  Sprawdź grafik
               </Button>
               <Button variant="contained" color="primary">
                  Dołącz
               </Button>
            </CardActionArea>
         </Card>
      </Backdrop>
   );
};

export default ShowTrainingsDetails;
