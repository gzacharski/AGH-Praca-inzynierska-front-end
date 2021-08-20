export const requestConfig = (token = '', locale = 'pl') => {
   const checkedLocale = locale !== null ? locale : 'pl';

   if (token && token !== '')
      return {
         headers: {
            'Accept-Language': checkedLocale,
            'Content-Type': 'application/json',
            Authorization: token,
         },
      };

   return {
      headers: {
         'Accept-Language': checkedLocale,
         'Content-Type': 'application/json',
      },
   };
};
