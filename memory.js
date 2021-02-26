/* eslint-disable indent */
'use strict';
class Memory {
    constructor() {
      this.memory = new Float64Array(1024);
      this.head = 0;
    }
    
    //reserves a contiguous block of memory consisting of size boxes you can modify, return pointer to first box or null if allocation fails
    allocate(size) {
      if (this.head + size > this.memory.length) {
        return null;
      }
  
      let start = this.head;
  
      this.head += size;
      return start;
    }
    
    //frees the block of memory reserved using allocate
    free(ptr) {}
  
    //copies size(amount of) boxes of data from the pointer(fromIdx) to the pointer(toIdx)
    //copy (10, 0, 3) -> copies 3 values from boxes 0, 1, 2 to the boxes 10, 11, 12
    copy(toIdx, fromIdx, size) {
      if (fromIdx === toIdx) {
        return;
      }
  
      if (fromIdx > toIdx) {
        // Iterate forwards
        for (let i = 0; i < size; i++) {
          this.set(toIdx + i, this.get(fromIdx + i));
        }
      } else {
        // Iterate backwards
        for (let i = size - 1; i >= 0; i--) {
          this.set(toIdx + i, this.get(fromIdx + i));
        }
      }
    }
    
    // returns the value stored at a certain memory address (ptr = pointer: variable containing memory address)
    get(ptr) {
      return this.memory[ptr];
    }
    
    //sets the value stored at a certain memory address
    set(ptr, value) {
      this.memory[ptr] = value;
    }
  }

  
module.exports = Memory;