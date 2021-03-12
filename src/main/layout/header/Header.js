import React from "react";
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from "./Header.styles";
import { toggleDrawer } from "../../store/state/action/creators";

const Header = (props) => {
    const classes = useStyles();
    
    return (
        <AppBar
            aria-label='application bar'
            className={classes.root}
            position='static'
            role='header'
        >
            <Toolbar>
                <IconButton
                    aria-label="open menu"
                    className={classes.menuButton}
                    color='inherit'
                    data-testid='header-menu-icon'
                    edge='start'
                    onClick={() => props.toggleDrawer()}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    aria-label='logo'
                    className={classes.title}
                    component='h4'
                    data-testid='header-menu-title'
                >
                    Miejce na logo
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        classes={{ input: classes.inputInput, root: classes.inputRoot }}
                        data-testid='header-search-input'
                        inputProps={{ 'aria-label': 'search' }}
                        placeholder="Szukaj..."
                        role='search'
                    />
                </div>
                <Button color='inherit' data-testid='header-login-button' role='button'>
                    Zaloguj się
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default connect(null, { toggleDrawer })(Header);