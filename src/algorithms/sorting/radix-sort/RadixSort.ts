const radixSort = (array: number[], radixBase = 10): number[] => {
  if (array.length < 2) return array;

  const maxValue = findMaxValue(array);

  for (let digit = 1; digit < maxValue; digit *= 10) {
    array = countingSortForRadix(array, radixBase, digit);
  }

  return array;
};

const findMaxValue = (array: number[]): number => {
  if (!array || array.length <= 0) return 0;

  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) max = array[i];
  }

  return max;
};

const countingSortForRadix = <T>(
  array: number[],
  radixBase: number,
  digit: number,
): number[] => {
  const buckets = new Array(radixBase).fill(0);
  const aux = new Array(radixBase).fill(0);

  for (let i = 0; i < array.length; i++) {
    const bucketsIndex = Math.floor((array[i] / digit) % radixBase);
    buckets[bucketsIndex]++;
  }

  for (let i = 1; i < buckets.length; i++) {
    buckets[i] += buckets[i - 1];
  }

  for (let i = array.length - 1; i >= 0; i--) {
    const bucketsIndex = Math.floor((array[i] / digit) % radixBase);
    aux[--buckets[bucketsIndex]] = array[i];
  }

  for (let i = 0; i < array.length; i++) array[i] = aux[i];

  return array;
};

export default radixSort;
