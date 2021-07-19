import { requestConfig } from './requestConfig';

describe('Request configuration', () => {
   test('should return proper Authorization and Accept-language when token and locale provided', () => {
      const config = requestConfig('testToken', 'en');
      const expectedConfig = {
         headers: {
            'Accept-Language': 'en',
            Authorization: 'testToken',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });

   test('should return proper Authorization and Accept-language when only token provided', () => {
      const config = requestConfig('testToken');
      const expectedConfig = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: 'testToken',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });

   test('should return only Accept-language when no token provided', () => {
      const config = requestConfig('', 'en');
      const expectedConfig = {
         headers: {
            'Accept-Language': 'en',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });

   test('should return default Accept-language when no argumetns provided', () => {
      const config = requestConfig();
      const expectedConfig = {
         headers: {
            'Accept-Language': 'pl',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });
});
