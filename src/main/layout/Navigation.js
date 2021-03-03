import React from "react";
import {NavLink} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export default function Navigation(props){
    const {openMenu,setOpenMenu}=props;

    return(
        <nav>
            <Drawer open={openMenu} onClose={()=>setOpenMenu(!openMenu)}>
                <List component='nav' aria-label='About'>
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
                    <Divider/>
                    <ListItem button component={NavLink} to="/login">
                        <ListItemText>Zaloguj się</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        </nav>
    )
}