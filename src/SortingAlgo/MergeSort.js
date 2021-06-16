export function getMergeSortAnimations(array) {
    let animations  = [];
    let tempArray = array.slice();
    mergeSort(tempArray, 0, tempArray.length - 1, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log(arraysAreEqual(javaScriptSortedArray, tempArray));
    array = tempArray;
    return [animations, array];
}

function mergeSort(tempArray, start, end, animations) {
    if(start === end)
        return;
    const mid = Math.floor((start + end)/2);
    mergeSort(tempArray, start, mid, animations);
    mergeSort(tempArray, mid + 1, end, animations);
    merge(tempArray, start, mid, end, animations);
}

function merge(tempArray, start, mid, end, animations) {
    let sortArray = [];
    let i = start;
    let j = mid + 1;
    while(i <= mid && j <= end) {
        //Comparing value at ith and jth index so push them to change their color
        animations.push(["comparison1", i, j]);
        //By changing color we imply that we are comparing those two values and then again we should revert back to their original color so push them again
        animations.push(["comparison2", i, j]);
        if(tempArray[i] <= tempArray[j]) {
            sortArray.push(tempArray[i++]);
        }
        else {
            sortArray.push(tempArray[j++]);
        }
    }
    while(i <= mid) {
        animations.push(["comparison1", i, i]);
        animations.push(["comparison2", i, i]);
        sortArray.push(tempArray[i++]);
    }
    while(j <= end) {
        animations.push(["comparison1", j, j]);
        animations.push(["comparison2", j, j]);
        sortArray.push(tempArray[j++]);
    }
    for (let i = start; i <= end; i++) {
        animations.push(["comparison1", i, i - start]);
        animations.push(["overwrite", i, sortArray[i - start]]);
        animations.push(["comparison2", i, i - start]);
        tempArray[i] = sortArray[i - start];
    }
}

function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
    return true;
}