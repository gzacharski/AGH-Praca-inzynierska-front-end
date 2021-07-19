export const requestConfig = (token = '', locale = 'pl') => {
   if (token && token !== '')
      return {
         headers: {
            'Accept-Language': locale,
            Authorization: token,
         },
      };

   return {
      headers: {
         'Accept-Language': locale,
      },
   };
};
