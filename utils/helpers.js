//-- Formatting Date
const format_date = date => {
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
    date
  ).getFullYear()}`;
};

// comparison operators
const eq = (var1, var2) =>  { console.log(var1,var2);return var1 === var2 };
const ne = (var1, var2) =>  { return var1 !== var2 };
const lt = (var1, var2) =>  { return var1 <   var2 };
const gt = (var1, var2) =>  { return var1 >   var2 };
const lte = (var1, var2) => { return var1 <=  var2 };
const gte = (var1, var2) => { return var1 >=  var2 };
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
  eq, ne, lt, gt, lte, gte
}