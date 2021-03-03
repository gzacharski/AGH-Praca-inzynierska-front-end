import React from "react";
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#1e88e5'
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '12ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
    button: {},
}));

export default function Header(props) {
    const classes = useStyles();

    const {openMenu,setOpenMenu}=props;

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
                    onClick={()=>setOpenMenu(!openMenu)}
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