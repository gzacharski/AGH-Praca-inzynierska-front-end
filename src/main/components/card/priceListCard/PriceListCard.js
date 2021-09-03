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
   const {
      documentId = '',
      title = '',
      subheader = '',
      price = {},
      premium = false,
      description = {},
   } = gymPass || {};
   const handleBuyClick = (history) =>
      history.push(`login?gympass=buy&client=${documentId}`);

   const { amount = 0, currency = 'zł', period = '' } = price;
   const { synopsis = '', features = [] } = description;

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
                     {amount}
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                     {currency}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                     /{period}
                  </Typography>
               </div>
               <div className={classes.cardPricing}>
                  <Typography align="center" color="textPrimary" variant="h6">
                     {synopsis}
                  </Typography>
               </div>
               <ul>
                  {features.map((feature) => (
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
