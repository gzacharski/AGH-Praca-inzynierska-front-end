import Button from '@material-ui/core/Button';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { useStyles } from './NavLinkButton.styles';

const NavLinkButton = (props) => {
   const classes=useStyles();
   const { name,link, testId} = props;
   const handleClick = (history) => history.push(link);
   // const btnClasses = { ...classes, ...useStyles().root };
   return (
      <Button
         color='inherit'
         data-testid={testId}
         role="button"
         onClick={() => handleClick(props.history)}
         className={classes.root}
         variant="contained"
      >
         {name}
      </Button>
   );
};

export default withRouter(NavLinkButton);
