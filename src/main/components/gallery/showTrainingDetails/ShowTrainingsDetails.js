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
               image={`data:image/${image.format};base64,${image.data}`}
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
                           src={`data:image/${avatar.format};base64, ${avatar.data}`}
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
               <Button
                  variant="contained"
                  color="primary"
                  data-testid="check-button"
               >
                  Sprawdź grafik
               </Button>
               <Button
                  variant="contained"
                  color="primary"
                  data-testid="join-button"
               >
                  Dołącz
               </Button>
            </CardActionArea>
         </Card>
      </Backdrop>
   );
};

export default ShowTrainingsDetails;
