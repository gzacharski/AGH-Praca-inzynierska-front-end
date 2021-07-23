import { joinEventTooltipTitle } from './joinEventTooltipTitle';

describe('Joine event tooltip title', () => {
   beforeEach(() => {
      Date.now = jest.fn(() => Date.parse('2020-10-10'));
   });

   test('should return "Zajęcia już się odbyły" when event took place', () => {
      expect(joinEventTooltipTitle('2020-10-08')).toBe(
         'Zajęcia już się odbyły.',
      );
   });

   test('should return "Dołącz do zajęć." when event will take place within 7 days', () => {
      expect(joinEventTooltipTitle('2020-10-11')).toBe('Dołącz do zajęć.');
   });

   test('should return "Możliwość zapisu na zajęcia wyłącznie w ciągu 7 dni przed rozpoczęciem zajęć." when event will take place within 7 day', () => {
      expect(joinEventTooltipTitle('2020-10-20')).toBe(
         'Możliwość zapisu na zajęcia wyłącznie w ciągu 7 dni przed rozpoczęciem zajęć.',
      );
   });
});
