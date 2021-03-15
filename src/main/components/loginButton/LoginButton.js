import Button from '@material-ui/core/Button';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

const LoginButton = (props) => {
    const handleClick = (history) => history.push('/login');
    const {name,history}=props;
    return (
        <Button
            color="inherit"
            data-testid="header-login-button"
            role="button"
            onClick={() => handleClick(history)}
        >
            Zaloguj się {name}
        </Button>
    );
};

export default withRouter(LoginButton);
