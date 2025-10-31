//question 1

function mySetInterval(fn, delay){
    function repeat(){
        fn();
        setTimeout(repeat, delay);
    }
    repeat();
}

mySetInterval(() => {
    console.log("Hello")
},1000);

//question 2

const arr = [func1, func2, func3];
function func1(){
    return Promise.resolve("Task 1");
}
function func2(){
    return Promise.resolve("Task 2");
}
function func3(){
    return Promise.resolve("Task 3");
}

arr[0]().then((res1) => {
    console.log(res1);
    return arr[1]();
})
.then((res2) => {
    console.log(res2);
    return arr[2]();
})
.then((res3) => {
  console.log(res3);      
})
.catch((err) => {
  console.log("Error occurred:", err);
});

//question 3

function retryPromise(fn, retries, delay = 500){
    return new Promise((resolve, reject) => {
        fn()
            .then(resolve)
            .catch(() => {
                if(retries > 0){
                    setTimeout(() => {
                        retryPromise(fn, retries - 1)
                        .then(resolve)
                        .catch(reject);
                    },delay)
                } 
                else{
                    reject("Fail")
                }
            })
    });
}

function testTask() {
  return new Promise((resolve, reject) => {
    let condition = false;
    if (condition) {
      resolve("Hello");
    } else {
      reject("Bye");
    }
  });
}

retryPromise(testTask, 3)
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));


//question 4

function allSettled(promises){
    return Promise.all(
        promises.map(Promise => 
            Promise
            .then(value => ({ status: "fulfilled", value }))
            .catch(reason => ({ status: "rejected", reason }))
        )
    )
}

const arr1 = [
  Promise.resolve("OK"),
  Promise.reject("Fail"),
  Promise.resolve("Done")
];

allSettled(arr1).then(console.log);
allSettled(arr1).then((msg) => console.log(msg));



