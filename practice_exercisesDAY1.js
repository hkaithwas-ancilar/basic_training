//question1

const fib = (n, memo) => {            //this is the recursive arrow function
    memo = memo || {}
    if (memo[n]) return memo[n];

    if (n == 0) return 0;
    if (n == 1) return 1;
    
    return memo[n] = fib(n-1, memo) + fib(n-2, memo)
}

const a = fib(10);
console.log(a);


//question2

function deepClone(obj){
    if(typeof obj !== "object" || typeof obj === null){
        return obj;
    }
    const clone = Array.isArray(obj) ? [] : {};
    for (let key in obj){
        clone[key] = deepClone(obj[key]);
    }
    return clone;
}

const original = {
  num: 10,                  
  arr: [1, 2, 3],           
  obj: { a: 1, b: 2 },
  x: function greet(){
    console.log("hello");
  }       
};

const copy = deepClone(original);
copy.num = 99;
copy.arr[0] = 99;
copy.obj.a = 99;
copy.x();

console.log(original);
console.log(copy);


//question 3

const calc = {
    total: 0,

    add(number){
        if(typeof number !== "number" || isNaN(number)){
            console.log("not a number");
            return this;
        }
        this.total += number;
        return this;
    },

    sub(number){
        if(typeof number !== "number" || isNaN(number)){
            console.log("not a number");
            return this;
        }
        this.total -= number;
        return this;
    },
    
    mul(number){
        if(typeof number !== "number" || isNaN(number)){
            console.log("not a number");
            return this;
        }
        this.total *= number;
        return this;
    },

    div (number){
        if(typeof number !== "number" || isNaN(number)){
            console.log("not a number");
            return this;
        }
        if(number == 0){
            console.log("do not divide by zero, skipped");
            return this;
        }
        else {
            this.total /= number;
            return this;
        }
    },

    value(){
        return this.total;
    }
};

console.log(calc.add(10).sub("abc").mul(4).div(0).value()); 




//question 4

class MyEventEmitter {
  constructor() {
    this.events = {}; 
  }

  // on basically listener ko add karne ki liye use karate hauuiii
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = []; 
    }
    this.events[eventName].push(listener); 
  }

  // emit for listening the event 
  emit(eventName, ...args) {
    const listeners = this.events[eventName];
    if (!listeners) return; 

    for (const listener of listeners) {
      listener(...args); 
    }
  }

  //  Event listener hataane ke liye
  off(eventName, listenerToRemove) {
    const listeners = this.events[eventName];
    if (!listeners) return;

    const newListeners = [];
    for (const listener of listeners) {
      if (listener !== listenerToRemove) {
        newListeners.push(listener); // filtering which we want to have 
      }
    }

    this.events[eventName] = newListeners;
  }
}


const ee = new MyEventEmitter();

function greet(name){
    console.log("hello " + name)
}

ee.on("greet" , greet)
ee.emit("greet" , "Harsh")
ee.off("greet" , greet)
