import React from 'react';
import clsx from 'clsx';
import {
   Button,
   Card,
   CardHeader,
   CardContent,
   CardActions,
   Typography,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useStyles } from './PriceListCard.styles';

const PriceListCard = (props) => {
   const classes = useStyles();
   const { gymPass } = props;
   const { id, title, subheader, price, premium, description } = gymPass;
   const handleBuyClick = (history) =>
      history.push(`/gympass/buy/${id}`);

   return (
      <Card>
         <CardHeader
            title={title}
            subheader={subheader}
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            className={classes.cardHeader}
         />
         <CardContent>
            <div className={classes.cardContent}>
               <div className={classes.cardPricing}>
                  <Typography variant="h3" color="textPrimary">
                     {price.amount}
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                     {price.currency}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                     /{price.period}
                  </Typography>
               </div>
               <div className={classes.cardPricing}>
                  <Typography align="center" color="textPrimary" variant="h6">
                     {description.synopsis}
                  </Typography>
               </div>
               <ul>
                  {description.features.map((feature) => (
                     <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        color="textSecondary"
                        key={feature}
                     >
                        {feature}
                     </Typography>
                  ))}
               </ul>
            </div>
         </CardContent>
         <CardActions>
            <Button
               fullWidth
               variant={premium ? 'contained' : 'outlined'}
               className={clsx({
                  [classes.button]: !premium,
                  [classes.buttonPremium]: premium,
               })}
               onClick={() => handleBuyClick(props.history)}
            >
               Kup
            </Button>
         </CardActions>
      </Card>
   );
};

export default withRouter(PriceListCard);
