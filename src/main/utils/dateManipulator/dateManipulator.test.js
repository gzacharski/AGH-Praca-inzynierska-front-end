import { formatDate, getEndOfWeek, getStartOfWeek } from './dateManipulator';

describe('formatDate test', () => {
   test('should return 2020-10-01', () => {
      const testDate = new Date(2020, 9, 1);
      expect(formatDate(testDate)).toBe('2020-10-01');
   });

   test('should return 2021-12-31', () => {
      const testDate = new Date(2020, 11, 31);
      expect(formatDate(testDate)).toBe('2020-12-31');
   });
});

describe('getEndOfWeek test', () => {
   test('should return 2021-07-18', () => {
      const testDate = new Date(2021, 6, 14);
      expect(getEndOfWeek(testDate)).toBe('2021-07-18');
   });

   test('should return 2022-01-02', () => {
      const testDate = new Date(2021, 11, 28);
      expect(getEndOfWeek(testDate)).toBe('2022-01-02');
   });

   test('should return 2021-02-28', () => {
      const testDate = new Date(2021, 1, 25);
      expect(getEndOfWeek(testDate)).toBe('2021-02-28');
   });
});

describe('getStartOfWeek test', () => {
   test('should return 2021-07-12', () => {
      const testDate = new Date(2021, 6, 14);
      expect(getStartOfWeek(testDate)).toBe('2021-07-12');
   });

   test('should return 2021-06-28', () => {
      const testDate = new Date(2021, 6, 2);
      expect(getStartOfWeek(testDate)).toBe('2021-06-28');
   });

   test('should return 2021-02-22', () => {
      const testDate = new Date(2021, 1, 25);
      expect(getStartOfWeek(testDate)).toBe('2021-02-22');
   });
});
