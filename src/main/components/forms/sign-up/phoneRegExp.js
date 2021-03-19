const conditions = [
   /^(\+\d{2})?(|[ -])(\d{3}(\2\d{3}){2})$/,
   /|/,
   /^(\d{3}([ -]))\d{3}\6\d{3}$/,
];

const phoneRegExp = new RegExp(
   conditions.map((regexp) => regexp.source).join(''),
);

export { phoneRegExp };
