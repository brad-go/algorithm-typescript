import insertionSort from '../insertion-sort';

const bucketSort = (array: number[], bucketSize = 5): number[] => {
  if (array.length < 2) return array;

  const buckets = createBuckets(array, bucketSize);

  return sortBuckets(buckets);
};

const createBuckets = (array: number[], bucketSize: number): number[][] => {
  let minValue = array[0];
  let maxValue = array[0];

  array.forEach((currentValue) => {
    if (currentValue < minValue) minValue = currentValue;
    else if (currentValue > maxValue) maxValue = currentValue;
  });

  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets: number[][] = new Array(bucketCount).fill(null).map(() => []);

  array.forEach((currentValue) => {
    const bucketIndex = Math.floor((currentValue - minValue) / bucketSize);
    buckets[bucketIndex].push(currentValue);
  });

  return buckets;
};

const sortBuckets = (buckets: number[][]): number[] => {
  const sotredArray: number[] = [];

  buckets.forEach((bucket) => {
    insertionSort(bucket);
    bucket.forEach((element) => sotredArray.push(element));
  });

  return sotredArray;
};

export default bucketSort;
