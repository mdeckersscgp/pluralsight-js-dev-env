import numeral from 'numeral';

const courseValue = numeral(1000).format('$0,0.00');
console.log(`Would pay ${courseValue} for this course`);
