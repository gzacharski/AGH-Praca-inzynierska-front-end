import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleDrawer } from "../store/state/action/creators";

const Navigation = (props) => {
  return (
    <nav>
      <Drawer open={props.menuIsOpen} onClose={() => props.toggleDrawer()}>
        <List component="nav" aria-label="About">
          <ListItem button component={NavLink} to="/" exact={true}>
            <ListItemText>Strona główna</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/news">
            <ListItemText>Aktualności</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/about">
            <ListItemText>O nas</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/blog">
            <ListItemText>Blog</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/client">
            <ListItemText>Klient</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/contact">
            <ListItemText>Kontakt</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/offer">
            <ListItemText>Oferta</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

const mapDispatchToProps = { toggleDrawer };

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
