import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { connect } from "react-redux";
import { LoginButton } from "../../components";
import { toggleDrawer } from "../../store/state/action/creators";
import { useStyles } from "./Header.styles";

const Header = (props) => {
  const classes = useStyles();

  return (
    <AppBar
      aria-label="application bar"
      className={classes.root}
      position="static"
      // eslint-disable-next-line jsx-a11y/aria-role
      role="header"
    >
      <Toolbar>
        <IconButton
          aria-label="open menu"
          className={classes.menuButton}
          color="inherit"
          data-testid="header-menu-icon"
          edge="start"
          onClick={() => props.toggleDrawer()}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          aria-label="logo"
          className={classes.title}
          component="h4"
          data-testid="header-menu-title"
        >
          Miejce na logo
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            classes={{ input: classes.inputInput, root: classes.inputRoot }}
            data-testid="header-search-input"
            inputProps={{ "aria-label": "search" }}
            placeholder="Szukaj..."
            role="search"
          />
        </div>
        <LoginButton />
      </Toolbar>
    </AppBar>
  );
};

export default connect(null, { toggleDrawer })(Header);
