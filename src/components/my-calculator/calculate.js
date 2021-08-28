/**
 * calculate function
 *
 * @param param1
 * @returns {function(*): function(*=): number}
 */
export const calculate = (param1) => (operator) => (param2) => {
  let result;
  if (operator === "add") {
    result = parseFloat(param1) + parseFloat(param2);
  } else if (operator === "subtract") {
    result = parseFloat(param1) - parseFloat(param2);
  } else if (operator === "multiply") {
    result = parseFloat(param1) * parseFloat(param2);
  } else if (operator === "divide") {
    result = parseFloat(param1) / parseFloat(param2);
  }
  return result;
};
