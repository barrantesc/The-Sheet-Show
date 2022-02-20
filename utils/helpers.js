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

// takes string of proficiencies separated by spaces, turns it into an array, goes through each item in the array and removes 'skill-' previx, then if the remainder is longer than two words, it replaces the dash separating the words with a space, then joins items in array into a string separated by a comma and a space. 
const format_prof = function (str) {
  let profArr = (str.split(" "));
  let newProfArr = [];
  for (let i = 0; i < profArr.length; i++) {
    let prof = profArr[i].split('skill-');
    if (prof.length > 1) {
    	prof.splice(0,1);
    }
    prof = prof.toString().replace('-', ' ');
    newProfArr.push(prof);
  }
  return newProfArr.join(', ');
}


//-- EXPORTS
module.exports = {
  format_date,
  eq, ne, lt, gt, lte, gte, 
  format_prof
}