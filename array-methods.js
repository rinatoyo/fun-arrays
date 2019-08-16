var dataset = require("./dataset.json");

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(element => {
  if (element.amount > 100000) {
    return true;
  }
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = dataset.bankBalances
  .map(element => {
    return element.amount;
  })
  .reduce((previous, current) => {
    return parseInt(previous) + parseInt(current);
  });

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = dataset.bankBalances
  .filter(element => {
    if (
      element.state == "WI" ||
      element.state == "IL" ||
      element.state == "WY" ||
      element.state == "OH" ||
      element.state == "GA" ||
      element.state == "DE"
    ) {
      return element.amount;
    }
  })
  .map(element => {
    return Math.round(Number(element.amount * 0.189));
  })
  .reduce((previous, current) => {
    return previous + current;
  });

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

var stateSums = dataset.bankBalances.reduce((prev, curr) => {
  let currState = curr.state;
  let currAmount = Math.round(parseInt(curr.amount));
  if (prev.hasOwnProperty(currState)) {
    prev[currState] += currAmount;
  } else {
    prev[currState] = currAmount;
  }
  return prev;
}, {});

console.log(stateSums);
/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

let selectStates = ["WI", "IL", "WY", "OH", "GA", "DE"];
var sumOfHighInterests = Object.entries(stateSums)
  .filter(element => {
    return !selectStates.includes(element[0]);
  })
  .map(element => {
    return Math.round(element[1] * 0.189);
  })
  .filter(element => {
    return element > 50000;
  })
  .reduce((prev, curr) => {
    return prev + curr;
  });

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = Object.entries(stateSums)
  .filter(element => {
    return element[1] < 1000000;
  })
  .reduce((prev, curr) => {
    prev.push(curr[0]);
    return prev;
  }, []);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = Object.entries(stateSums)
  .filter(element => {
    return element[1] > 1000000;
  })
  .map(element => {
    return element[1];
  })
  .reduce((prev, curr) => {
    return prev + curr;
  });

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = selectStates.every(element => {
  return stateSums[element] > 2550000;
});

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = selectStates.some(element => {
  return stateSums[element] > 2550000;
});

module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
