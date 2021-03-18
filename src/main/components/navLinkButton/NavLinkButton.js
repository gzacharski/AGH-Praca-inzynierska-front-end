import Button from '@material-ui/core/Button';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { useStyles } from './NavLinkButton.styles';

const NavLinkButton = (props) => {
   const handleClick = (history) => history.push(props.link);
   const { name, history, classes, testId} = props;
   const btnClasses = { ...classes, ...useStyles().root };
   return (
      <Button
         color="inherit"
         data-testid={testId}
         role="button"
         onClick={() => handleClick(history)}
         className={btnClasses.root}
      >
         {name}
      </Button>
   );
};

export default withRouter(NavLinkButton);
