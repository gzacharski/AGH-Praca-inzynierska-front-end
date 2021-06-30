export const initialStore = {
   modelData: {
      account: {
         user: {
            id: null,
            name: null,
            surname: null,
         },
         avatar: {
            data: null,
            format: null,
         },
         notifications: {
            toCheck: 0,
            notificationList: [],
         },
         messages: { toCheck: 0, messageList: [] },
      },
      users: [],
      trainings: [],
   },
   stateData: {
      menuIsOpen: false,
      menuMoreInfo: false,
   },
};
