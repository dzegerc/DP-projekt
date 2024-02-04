export function customMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }
  return result;
}

export function customReduce(array, callback, initialValue) {
  let accumulator = initialValue === undefined ? array[0] : initialValue;
  const startIdx = initialValue === undefined ? 1 : 0;

  for (let i = startIdx; i < array.length; i++) {
    accumulator = callback(accumulator, array[i]);
  }

  return accumulator;
}

export function customFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}

export function customPipe(...functions) {
  return function (input) {
    return functions.reduce((acc, fn) => fn(acc), input);
  };
}
