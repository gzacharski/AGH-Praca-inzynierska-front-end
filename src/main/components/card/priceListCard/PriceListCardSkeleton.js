import React from 'react';
import {
   Button,
   Card,
   CardHeader,
   CardContent,
   CardActions,
   Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useStyles } from './PriceListCard.styles';

const PriceListCardSkeleton = ({ isSmall }) => {
   const classes = useStyles();

   const sizes = isSmall
      ? ['80%', '70%', '85%', '76%']
      : ['80%', '70%', '85%', '76%', '82%', '60%'];

   return (
      <Card>
         <CardHeader
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            className={classes.cardHeaderSkeleton}
         />
         <CardContent>
            <div className={classes.cardContent}>
               <div className={classes.cardPricingSkeleton}>
                  <Typography variant="h2" align="center" color="textSecondary">
                     <Skeleton width="80%" className={classes.textSkeleton} />
                  </Typography>
               </div>
               <div className={classes.cardPricingSkeleton}>
                  {['80%', '75%'].map((width) => (
                     <Typography
                        key={width}
                        variant="h6"
                        align="center"
                        color="textSecondary"
                     >
                        <Skeleton
                           width={width}
                           className={classes.textSkeleton}
                        />
                     </Typography>
                  ))}
               </div>
               <ul>
                  {sizes.map((width) => (
                     <Typography
                        key={width}
                        component="li"
                        variant="subtitle1"
                        align="center"
                        color="textSecondary"
                     >
                        <Skeleton
                           width={width}
                           className={classes.textSkeleton}
                        />
                     </Typography>
                  ))}
               </ul>
            </div>
         </CardContent>
         <CardActions>
            <Skeleton width="100%" className={classes.buttonSkeleton}>
               <Button />
            </Skeleton>
         </CardActions>
      </Card>
   );
};

export default PriceListCardSkeleton;
