import { requestConfig } from './requestConfig';

describe('Request configuration', () => {
   test('should return proper Authorization and Accept-language when token and locale provided', () => {
      const config = requestConfig('testToken', 'en');
      const expectedConfig = {
         headers: {
            'Accept-Language': 'en',
            Authorization: 'testToken',
            'Content-Type': 'application/json',
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
            'Content-Type': 'application/json',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });

   test('should return only Accept-language when no token provided', () => {
      const config = requestConfig('', 'en');
      const expectedConfig = {
         headers: {
            'Accept-Language': 'en',
            'Content-Type': 'application/json',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });

   test('should return default Accept-language when no argumetns provided', () => {
      const config = requestConfig();
      const expectedConfig = {
         headers: {
            'Accept-Language': 'pl',
            'Content-Type': 'application/json',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });

   test('should return proper Authorization and Accept-language when only token provided with locale undefined', () => {
      const config = requestConfig('testToken', undefined);
      const expectedConfig = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: 'testToken',
            'Content-Type': 'application/json',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });

   test('should return proper Authorization and Accept-language when only token provided with locale null', () => {
      const config = requestConfig('testToken', null);
      const expectedConfig = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: 'testToken',
            'Content-Type': 'application/json',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });

   test('should return default Accept-language when both null provided', () => {
      const config = requestConfig(null, null);
      const expectedConfig = {
         headers: {
            'Accept-Language': 'pl',
            'Content-Type': 'application/json',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });

   test('should return default Accept-language when both undefined provided', () => {
      const config = requestConfig(undefined, undefined);
      const expectedConfig = {
         headers: {
            'Accept-Language': 'pl',
            'Content-Type': 'application/json',
         },
      };

      expect(config).toStrictEqual(expectedConfig);
   });
});
