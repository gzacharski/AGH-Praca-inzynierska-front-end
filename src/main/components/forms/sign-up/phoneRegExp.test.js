import { phoneRegExp} from './phoneRegExp';

const regExp=phoneRegExp;

describe('Phone number (in Poland)', () => {
   describe('should match', () => {
      test('+48123465876', () => {
         expect('+48123465876'.match(regExp)).toBeTruthy();
      });

      test('123465876', () => {
         expect('123465876'.match(regExp)).toBeTruthy();
      });

      test('+48 123 465 876', () => {
         expect('+48 123 465 876'.match(regExp)).toBeTruthy();
      });

      test('+48-123-465-876', () => {
        expect('+48-123-465-876'.match(regExp)).toBeTruthy();
     });

     test('123-465-876', () => {
        expect('123-465-876'.match(regExp)).toBeTruthy();
     });
      test('123 465 876', () => {
         expect('123 465 876'.match(regExp)).toBeTruthy();
      });


   });

   describe('should NOT match', () => {
      test('12345678', () => {
         expect('12345678'.match(regExp)).toBeFalsy();
      });

      test('+48123-465-876', () => {
         expect('+48123-465-876'.match(regExp)).toBeFalsy();
      });

      test('123 465-876', () => {
         expect('123 465-876'.match(regExp)).toBeFalsy();
      });

      test('+48-123 465-876', () => {
         expect('+48-123 465-876'.match(regExp)).toBeFalsy();
      });

      test('+48-123-465 876', () => {
         expect('+48-123-465 876'.match(regExp)).toBeFalsy();
      });

      test('+48 123-465-876', () => {
         expect('+48 123-465-876'.match(regExp)).toBeFalsy();
      });

      test('+48-123 65-876', () => {
         expect('+48-123 65-876'.match(regExp)).toBeFalsy();
      });

      test('+48-123465876', () => {
         expect('+48-123465876'.match(regExp)).toBeFalsy();
      });

      test('adasf', () => {
         expect('adasf'.match(regExp)).toBeFalsy();
      });

      test('+48123465876 ', () => {
        expect('+48123465876 '.match(regExp)).toBeFalsy();
     });

     test('123465876 1', () => {
        expect('123465876 1'.match(regExp)).toBeFalsy();
     });

     test('+48 123 465 876 1', () => {
        expect('+48 123 465 876 1'.match(regExp)).toBeFalsy();
     });

     test('+48-123-465-876 ', () => {
       expect('+48-123-465-876 '.match(regExp)).toBeFalsy();
    });

    test('+48 123465876', () => {
        expect('+48 123465876'.match(regExp)).toBeFalsy();
     });
   });
});
