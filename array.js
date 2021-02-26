/* eslint-disable*/
'use strict';

const Memory = require('./memory.js')

const memory = new Memory()

class Array {
    constructor(){
        this.length = 0; // array starts at length 0
        this._capacity = 0; // how many items you can hold without resizing
        this.ptr = memory.allocate(this.length) // pointer at memory address of this.length (starts at 0)
    }

    /*****************************************************INITIALIZING AND PUSHING**********************************************/
    //resizes array and increaes the length anf sets a single memory address (both O(1) operations) so it is overall an O(n) operation
    push(value) {
        if( this.length >= this._capacity){ // only resize if the conditions are met
            this._resize((this.length + 1) * Array.SIZE_RATIO) // resize the array so there is space for the new item (need to define this method) => resize according to the SIZE_RATIO (in this case 3 times)
        }
        memory.set(this.ptr + this.length, value) // set memory address at ptr +length to be equal to the value
        this.length++
    }

    //to copy each item of data to the new box every time you resize the array, is n copies so the worst, best and average case is O(n)
    _resize(size) {
        const oldPtr = this.ptr // sets old pointer to the current pointer
        this.ptr = memory.allocate(size) //reserves a contiguous blocks of memory and sets pointer to the first box of that free memory
        if (this.ptr == null) {
            throw new Error('Out of memory')
        } // => if ptr gets set to null then there is no space
        memory.copy(this.ptr, oldPtr, this.length) // copy the old data to the new array
        memory.free(oldPtr) //frees the block of space allocated by the allocate method
        this._capacity = size;
    }

    /**************************************************** RETRIEVING VALUES *****************************************************/
    //Adds an index offset and then retrieves data from a specific memory address O(1) operation
    get(index) {
        if(index < 0 || index >= this.length) {
            throw new Error('Index Error')
        }
        return memory.get(this.ptr + index)
    }

    /*************************************************** POPPING VALUES *********************************************************/
    //to pop a value just leave an empty space that will be filled in the next push instead of resizing the array O(1) operation
    pop(){
        if(this.length == 0){
            throw new Error('Index error')
        }
        const value = memory.get(this.ptr + this.length - 1)
        this.length--
        return value 
    }

    /***************************************************** INSERTING VALUES **********************************************/   
    // to insert a value at any point you need to shift all values after insertion O(n) operation
    insert(index, value){
        if(index < 0 || index >= this.length){
            throw new Error('Index Error')
        }

        if(this.length >= this._capacity){
            this._resize((this.length + 1) * Array.SIZE_RATIO)
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index)
        memory.set(this.ptr + index, value)
        this.length++
    } 

    /*****************************************************REMOVING VALUES**********************************************/
    // similar to insertion except copying values backwards to fill the empty space O(n) operation
    remove(index) {
        if(index < 0 || index >= this.length){
            throw new Error('Index error')
        } 
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1)
        this.length--
    }
}

/******************************************* EXPLORE THE PUSH() METHOD /POP() METHOD ***************************************************/
function main(){
    Array.SIZE_RATIO = 3
    let arr = new Array() // creates new instance of the Array clas
    arr.push(3)
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);
    arr.pop();
    arr.pop();
    arr.pop();
    console.log(arr)
    console.log(arr.get(0))

    arr = new Array()
    arr.push('tauhida')
    console.log(arr)
    console.log(arr.get(0))
}

main()

/*
What is the length, capacity and memory address? 
    - {length: 1, capacity: 3, ptr: 0} => with one arr.push(3)
    - {length: 6, capacity: 12, ptr: 3} => with arr.push(5), 15,19,45,10
    - {length: 3, capacity: 12, ptr: 3} => with arr.pop() 3 times
*/

/**************************************** UNDERSTANDING MORE ABOUT HOW ARRAYS WORK ****************************************************/
//print the first item im the array arr  => added console.log(arr.get(0)) => gets the first item in the array
//Print after pushing ('tauhida') into a new array => Array {length: 1, capacity: 3, ptr: 15} NAN
//  - return lenght of 1, capacity of three but the new memory address is at 15 (instead of 0)
//  - Also the value at index 0 is NaN



