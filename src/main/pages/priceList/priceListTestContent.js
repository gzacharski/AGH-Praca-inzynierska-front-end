export const testGymPasses = [
   {
      id: 'ac881e68-999f-4656-b75b-c67baa3073f3',
      title: 'Wejście jednorazowe',
      price: { amount: '19,99', currency: 'zł', period: 'wejście' },
      premium: false,
      description: {
         synopsis: 'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
         features: [ // powinno być od 4 do 8 
            'dostęp do każdego sprzętu fitness',
            'dowolne godziny wejścia',
            'nieograniczony czas wejścia',
            'dostęp do sauny',
         ],
      },
   },
   {
      id: 'ffad7844-79a4-47d4-a646-4d6aa928631c',
      title: 'Karnet 4 wejścia',
      subheader: 'Najpopularniejszy dla ograniczonej liczby wejść', // pole opcjonalne 
      price: { amount: '69,99', currency: 'zł', period: '4 wejścia' },
      premium: true,
      description: {
         synopsis: 'Karnet idealny dla osób o nieregularnym trybie życia',
         features: [
            'dostęp do każdego sprzętu fitness',
            'grupowe i indywidualne zajęcia fitness',
            'dowolne godziny wejścia',
            'nieograniczony czas wejścia',
            'nieograniczona ważność karnetu',
            'dostęp do sauny',
         ],
      },
   },
   {
      id: 'c62e98a5-fef8-47a3-81ef-c9c89da8da2e',
      title: 'Karnet 8 wejść',
      price: { amount: '108,99', currency: 'zł', period: '8 wejść' },
      premium: false,
      description: {
         synopsis: 'Karnet idealny dla osób o nieregularnym trybie życia',
         features: [
            'dostęp do każdego sprzętu fitness',
            'grupowe i indywidualne zajęcia fitness',
            'dowolne godziny wejścia',
            'nieograniczony czas wejścia',
            'nieograniczona ważność karnetu',
            'dostęp do sauny',
         ],
      },
   },
   {
      id: '6f2298fb-8d05-4e86-8dce-4a448e1da14f',
      title: 'Standardowy',
      subheader: 'Najpopularniejszy', // pole opcjonalne 
      price: { amount: '139,99', currency: 'zł', period: 'miesiąc' },
      premium: false,
      description: {
         synopsis: 'Najlepszy wybór dla osób regularnie ćwiczących',
         features: [
            'dostęp do każdego sprzętu fitness',
            'grupowe i indywidualne zajęcia fitness',
            'dowolne godziny wejścia',
            'nieograniczony czas wejścia',
            'nieograniczona liczba wejść',
            'ważność 30 dni',
            'dostęp do sauny',
         ],
      },
   },
   
];
