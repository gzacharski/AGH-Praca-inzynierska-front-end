import React from 'react';
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
import { useStyles } from './TrainingCard.styles';
// import ShowTrainingsDetails from '../../gallery/showTrainingDetails/ShowTrainingsDetails';

const TrainingCard = ({
   image = '',
   title = '',
   description = '',
   trainer = {},
}) => {
   const classes = useStyles();
   // const [open, setOpen] = useState(false);

   const { name = '', surname = '', avatar = '' } = trainer;
   const trainerName = `${name} ${surname}`;

   return (
      <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
         <Card
            className={classes.card}
            elevation={10}
            // onClick={() => setOpen(true)}
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
         {/* {open && (
            <ShowTrainingsDetails
               open={open}
               setOpen={setOpen}
               image={imageSource}
               title={title}
               description={description}
               trainer={trainer}
               avatar={trainerAvatar}
            />
         )} */}
      </Grid>
   );
};

export default TrainingCard;
