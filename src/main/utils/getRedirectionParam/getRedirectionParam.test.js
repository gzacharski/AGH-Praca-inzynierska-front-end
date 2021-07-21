import { getRedirectionParam } from './getRedirectionParam';

describe('Get redirection param', () => {
   test('should return default redirection param when no argument provided', () => {
      expect(getRedirectionParam()).toBe('/');
   });

   test('should return default redirection param when null argument provided', () => {
      expect(getRedirectionParam(null)).toBe('/');
   });

   test('should return default redirection param when undefined argument provided', () => {
      expect(getRedirectionParam(undefined)).toBe('/');
   });

   test('should return default redirection param when object argument provided', () => {
      expect(getRedirectionParam({})).toBe('/');
   });

   test('should return default redirection param when empty string argument provided', () => {
      expect(getRedirectionParam('')).toBe('/');
   });

   test('should return redirection /timetable param when valid argument provided', () => {
      const search = '?redirect=/timetable';
      expect(getRedirectionParam(search)).toBe('/timetable');
   });

   test('should return redirection param when valid argument provided', () => {
      const search = '?redirect=/admin/logs&token=test';
      expect(getRedirectionParam(search)).toBe('/admin/logs');
   });

   test('should return redirection /timetable param when valid argument provided without ?', () => {
      const search = 'redirect=/timetable';
      expect(getRedirectionParam(search)).toBe('/timetable');
   });

   test('should return redirection param when valid argument provided without ?', () => {
      const search = 'redirect=/admin/logs&token=test';
      expect(getRedirectionParam(search)).toBe('/admin/logs');
   });
});
