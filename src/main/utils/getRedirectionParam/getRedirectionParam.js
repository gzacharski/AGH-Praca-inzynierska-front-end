export const getRedirectionParam = (search = '') => {
   if (search === '') return '/';
   const searchParams = new URLSearchParams(search);
   if (searchParams.has('redirect')) return searchParams.get('redirect');
   return '/';
};
