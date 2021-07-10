import { startsWithAny } from './str-checker';

describe('For given URLs list', () => {
   const URLs = [
      '/login/fs',
      '/login',
      '/sign-up',
      '/sign-up/dsafga',
      '/fafas',
      'a',
   ];

   test.each([['/login'], ['/sign-up'], ['/fafas'], ['aft']])(
      "pathname '%s' should startWith any string of the list.",
      (pathname) => {
         expect(startsWithAny(pathname, URLs)).toBeTruthy();
      },
   );

   test.each([['/logi1'], ['/signUp'], ['/fafads'], ['/*'], ['/']])(
      "pathname '%s' should NOT startWith any string of the list.",
      (pathname) => {
         expect(startsWithAny(pathname, URLs)).toBeFalsy();
      },
   );
});
