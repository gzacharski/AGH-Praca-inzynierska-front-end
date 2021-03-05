import React from "react";
import { connect } from 'react-redux';
import { toggleDrawer } from "../store/state/action/creators";
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const Navigation = (props) => {
    const { menuIsOpen, toggle } = props;
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose = () => {
        toggle();
        setIsOpen(menuIsOpen);
    }
    
    return(
        <nav>
            <Drawer open={isOpen} onClose={()=>handleClose()}>
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

const mapStateToProps=(store)=>({
    menuIsOpen : store.stateData.menuIsOpen,
})

const mapDispatchToProps ={ 
    toggle: toggleDrawer
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);