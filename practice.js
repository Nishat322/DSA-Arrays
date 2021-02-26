/************************************************* URLify a String ******************************************************/


/************************************************* Filtering and Array ******************************************************/
function filter(array){
    for (let i = array.length -1; i >= 0; i--){
        if(array[i] < 5){
            array.splice(i, 1)
        }   
    }
    return array
}

console.log(filter([3 ,3, 3, 3, 20]))

/************************************************ Max Sum in the Array *******************************************************/
function maxSum(array){
    let sum = 0
    for (let i = 0; i < array.length - 2; i++){
        for(let j = 1; j < array.length - 1; j++ ){
            if (array[i] + array[j] > sum){
                sum = array[i] + array [j]
                
            }
        }
    }
    return sum
}

console.log(maxSum([4, 6, -3, 5, -2, 1]))

/**************************************************** Merge Arrays ******************************************************/
function merge(arr1, arr2) {
    let merged = [];
    let index1 = 0;
    let index2 = 0;
    let current = 0;
  
    while (current < (arr1.length + arr2.length)) {
  
      let isArr1Depleted = index1 >= arr1.length;
      let isArr2Depleted = index2 >= arr2.length;
  
      if (!isArr1Depleted && (isArr2Depleted || (arr1[index1] < arr2[index2]))) {
        merged[current] = arr1[index1];
        index1++;
      } else {
        merged[current] = arr2[index2];
        index2++;
      }
  
      current++;
    }
    console.log(merged)
  
    return merged;
  }
  

merge([1,3,6,8,11], [2,3,5,8,9,10])


/***************************************************** 2D Array ***************************************************/
function twoDArray(array){
    for (let i = 0; i < array.length; i++){
        for (let j = 0; j < array[i][j].length; j++){
            if(array[i][j] === 0){
               console.log('found 0')
            }
        }
    }
}

let arr = [[1,0,1,1,0],
[0,1,1,1,0],
[1,1,1,1,1],
[1,0,1,1,1],
[1,1,1,1,1]];

twoDArray(arr)

//go through each index of the array
//if the value is equal to 0
//set all values in the array = 0 and all the other values at that same index in all the other arrays in 0
