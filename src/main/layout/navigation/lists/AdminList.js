import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import {
   Fingerprint,
   BubbleChart,
   Cloud,
   FileCopy,
   SupervisorAccount,
   PermDataSetting,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

const AdminList = (props) => {
   const { menuIsOpen } = props;
   return (
      <List
         component="div"
         aria-labelledby="nested-list-subheader"
         subheader={
            menuIsOpen && (
               <ListSubheader component="div" disableSticky>
                  Administrator
               </ListSubheader>
            )
         }
      >
         <CustomListItem buttonName="Logi" CustomIcon={Fingerprint} />
         <CustomListItem buttonName="Statystyki" CustomIcon={BubbleChart} />
         <CustomListItem
            buttonName="Użytkownicy"
            CustomIcon={SupervisorAccount}
         />
         <CustomListItem buttonName="Zarządzaj" CustomIcon={Cloud} />
         <CustomListItem buttonName="Kopia zapasowa" CustomIcon={FileCopy} />
         <CustomListItem buttonName="Konfiguruj" CustomIcon={PermDataSetting} />
      </List>
   );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

export default connect(mapStateToProps, null)(AdminList);
