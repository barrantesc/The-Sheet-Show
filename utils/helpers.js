//-- Formatting Date
const format_date = date => {
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
    date
  ).getFullYear()}`;
};


// //-- equal comparision checker
// const eq = (var1, var2) => {
  
//   if(var1 === var2 ){  return true };
  
//   return false;
// };


const  eq = (var1, var2) => { return v1 === v2 };
//   ne: (v1, v2) => v1 !== v2,
//   lt: (v1, v2) => v1 < v2,
//   gt: (v1, v2) => v1 > v2,
//   lte: (v1, v2) => v1 <= v2,
//   gte: (v1, v2) => v1 >= v2,
//   and() {
//       return Array.prototype.every.call(arguments, Boolean);
//   },
//   or() {
//       return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
//   }
// });


//-- EXPORTS
module.exports = {
  format_date,
  eq
}