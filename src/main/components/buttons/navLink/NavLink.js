import { Button } from '@material-ui/core';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { useStyles } from './NavLink.styles';

const NavLink = (props) => {
   const classes = useStyles();
   const { name, link, testId } = props;
   const handleClick = (history) => history.push(link);
   return (
      <Button
         color="primary"
         data-testid={testId}
         onClick={() => handleClick(props.history)}
         className={classes.root}
      >
         {name}
      </Button>
   );
};

export default withRouter(NavLink);
