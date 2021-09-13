/*const allOrders = [
  { text: 'ቈ', ingredients: [0] },
  { text: 'ᎋ', ingredients: [1] },
  { text: 'ⶀ', ingredients: [2] },
  { text: 'ዒ', ingredients: [3] },

  // Switch to requiring exact count of required ingredients (instead of simple presence)?
  { text: 'ቈቈቈ', ingredients: [0, 0, 0] },
  { text: 'ᎋᎋᎋ', ingredients: [1, 1, 1] },
  { text: 'ⶀⶀⶀ', ingredients: [2, 2, 2] },
  { text: 'ዒዒዒ', ingredients: [3, 3, 3] },

  { text: 'ቈⶀ', ingredients: [0, 2] },
  { text: 'ᎋዒ', ingredients: [1, 3] },

  { text: '۞', ingredients: [4] },
  { text: '۞ቈ', ingredients: [4, 0] },
  { text: '۞ᎋ', ingredients: [4, 1] },
  { text: '۞ⶀ', ingredients: [4, 2] }, // explode
  { text: '۞ዒ', ingredients: [4, 3] }, // explode?
  { text: '۞ቈⶀ', ingredients: [4, 0, 2] }, // explode risk
  { text: '۞ᎋዒ', ingredients: [4, 1, 3] }, // explode risk

  { text: 'ቈ۞ᎋ', ingredients: [4, 0, 1] }, // mix must buffer (fizz for separation?)
  // exploder { text: 'ⶀ۞ዒ', ingredients: [4, 2, 3] }, // mix must buffer
  // solved by fizz separation of single ingredients with non-reactive component on top?
  // fizz prevents regular mixes but not explosions
  // recipe:

  { text: 'ঊ', ingredients: [5] },
  { text: 'ঊቈ', ingredients: [5, 0] }, // explode
  { text: 'ঊᎋ', ingredients: [5, 1] }, // explode?
  { text: 'ঊⶀ', ingredients: [5, 2] },
  { text: 'ঊዒ', ingredients: [5, 3] },
  { text: 'ঊቈⶀ', ingredients: [5, 0, 2] }, // explode risk
  { text: 'ঊᎋዒ', ingredients: [5, 1, 3] }, // explode risk

  // exploder { text: 'ቈঊᎋ', ingredients: [5, 0, 1] }, // mix must buffer
  { text: 'ⶀঊዒ', ingredients: [5, 2, 3] }, // mix must buffer (fizz for separation?)

  { text: 'ቈᎋ', ingredients: [0, 1] }, // needs any buffer layer so it doesn't become silver (or fizz)
  { text: 'ቈⶀᎋ', ingredients: [0, 2, 1] }, // buffer or fizz
  { text: 'ቈዒᎋ', ingredients: [0, 3, 1] }, // buffer or fizz

  { text: 'ⶀዒ', ingredients: [2, 3] }, // needs any buffer layer so it doesn't become purple (or fizz or fizz only - exact match only)
  { text: 'ⶀᎋዒ', ingredients: [2, 1, 3] }, // buffer or fizz
  { text: 'ⶀቈዒ', ingredients: [2, 0, 3] }, // buffer or fizz

  { text: '۞ঊ', ingredients: [4, 5] },

  { text: 'ⶀቈዒᎋ', ingredients: [0, 1, 2, 3] }, // buffer or fizz
].sort(() => 0.5 - Math.random());

const orders =  [
  ...allOrders,
  // { text: 'ቈঊᎋ', ingredients: [5, 0, 1] }
  // V1
 // { text: 'ⶀ۞ዒ', ingredients: [2, 3, 4] }, // middle buffer (only with fizz or double stacking?) (v1 exploders)
 // { text: 'ⶀ۞ዒ', ingredients: [2, 3, 4] }, // middle buffer (only with fizz or double stacking?) (v1 exploders) - not possible with v2
 // { text: '۞ⶀ', ingredients: [4, 0] },

  // V2
  //{ text: 'ቈ۞ዒ', ingredients: [0, 3, 4] }, // mix buffer (only forces  with non-mix exploders)
  //{ text: '۞ⶀ', ingredients: [4, 2] }, // buffer (only 0) or explode

  { text: '۞ዒ', ingredients: [4, 3] }, // buffer or explode
  { text: 'ঊቈ', ingredients: [5, 0] }, // buffer or explode
  { text: 'ঊᎋ', ingredients: [5, 1] }, // buffer or explode
  { text: 'ঊቈⶀ', ingredients: [5, 0, 2] }, // explode risk
  { text: 'ঊᎋዒ', ingredients: [5, 1, 3] }, // explode risk
  { text: '۞ቈⶀ', ingredients: [4, 0, 2] }, // explode risk
  { text: '۞ᎋዒ', ingredients: [4, 1, 3] }, // explode risk

  // V3
  //{ text: 'ᎋቈ۞', ingredients: [0, 1, 4] } // middle buffer (or fizz) (harder with non-mix exploders)

  // V4
  //{ text: 'ቈ۞ዒ', ingredients: [0, 3, 4] }, // mix buffer (only forced with non-mix exploders)
  { text: 'ቈ۞ዒ', ingredients: [0, 3, 4] }, // mix buffer (only forced with non-mix exploders)
  //{ text: '۞ⶀ', ingredients: [4, 2] }, // buffer (only 0) or explode
  //{ text: '۞ঊ', ingredients: [4, 5] }, // make exploder and then defuse via mix (optionally) / otherwise only with 1 never touching 4 & 2 never touching 5)


].sort(() => 0.5 - Math.random());*/

//export default orders;

export const level1 = [
  { text: 'ቈ', ingredients: [0] },
  { text: 'ᎋ', ingredients: [1] },
  { text: 'ⶀ', ingredients: [2] },
  { text: 'ዒ', ingredients: [3] },
  { text: '۞', ingredients: [4] },
  { text: 'ঊ', ingredients: [5] },
  { text: 'ቈⶀ', ingredients: [0, 2] },
  { text: 'ᎋዒ', ingredients: [1, 3] }
];

export const level2 = [
  { text: 'ቈቈ', ingredients: [0, 0] }, // needs safe buffer
  { text: 'ᎋᎋ', ingredients: [1, 1] }, // needs safe buffer
  { text: '۞ঊ', ingredients: [4, 5] }, // explode risk
  { text: 'ቈⶀ', ingredients: [0, 2] }, // safe
  { text: 'ᎋዒ', ingredients: [1, 3] }, // safe
  { text: '۞ⶀ', ingredients: [4, 2] }, // buffer (only 0) or explode
  { text: 'ঊቈ', ingredients: [5, 0] }, // buffer (only 2) or explode
];

export const level3 = [
  { text: '۞ⶀ', ingredients: [4, 2] }, // explode
  { text: '۞ዒ', ingredients: [4, 3] }, // explode?
  { text: '۞ቈⶀ', ingredients: [4, 0, 2] }, // explode risk
  { text: '۞ᎋዒ', ingredients: [4, 1, 3] }, // explode risk
  { text: 'ቈዒ', ingredients: [0, 3] }, // impossible? no - 0 2 2 3
  { text: 'ᎋⶀ', ingredients: [1, 2] }, // impossible? no - 2 0 1 1
  { text: 'ቈ۞ዒ', ingredients: [0, 3, 4] }, // mix buffer (only forced with non-mix exploders)
  { text: 'ቈ۞ዒ', ingredients: [0, 3, 4] }, // mix buffer (only forced with non-mix exploders)
  { text: 'ᎋঊⶀ', ingredients: [1, 2, 5] }, // mix buffer (only forced with non-mix exploders)
];

export const level4 = [
  ...level2,
  ...level3
];
