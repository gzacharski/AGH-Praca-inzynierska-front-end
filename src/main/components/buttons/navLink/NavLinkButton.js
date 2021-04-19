import Button from '@material-ui/core/Button';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { useStyles } from './NavLinkButton.styles';

const NavLinkButton = (props) => {
   const { name,link, classes, testId} = props;
   const handleClick = (history) => history.push(link);
   const btnClasses = { ...classes, ...useStyles().root };
   return (
      <Button
         color="inherit"
         data-testid={testId}
         role="button"
         onClick={() => handleClick(props.history)}
         className={btnClasses.root}
      >
         {name}
      </Button>
   );
};

export default withRouter(NavLinkButton);
