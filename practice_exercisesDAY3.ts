// //question1 

// interface shape {
//     area(): number,
//     perimeter(): number
// }

// class Circle implements shape{
//     radius: number = 0;
    
//     setRadius(r: number){
//         this.radius = r;
//     }

//     area(): number{
//         return 3.14*this.radius*this.radius;
//     }

//     perimeter(){
//         return 2*3.14*this.radius;
//     }

// }
// class Rectangle implements shape {
//     width: number = 0;
//     length: number = 0;

//     setDimensions(w: number, h: number) {
//     this.width = w;
//     this.length = h;
//     }

//     area(): number {
//     return this.width * this.length;
//     }
//     perimeter(): number {
//     return 2 * (this.width + this.length);
//     }
// }

// const c = new Circle();
// c.setRadius(6);
// console.log(c.area());
// console.log(c.perimeter());

// const r = new Rectangle();
// r.setDimensions(4, 10);
// console.log(r.area());
// console.log(r.perimeter());

// //question 2

// function filterByType(arr: unknown[], 
//     type: 'string' | 'number' | 'boolean' | 'object'): unknown[] {
//     const result: any[] = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (typeof arr[i] === type) {
//             result.push(arr[i]);
//         }
//     }
//     return result;
// }

// const sample = [1, "hi", true, 2, "bye", false];
// console.log(filterByType(sample, "number"));
// console.log(filterByType(sample, "string"));

// // question 3

// type Result<T, E> = 
//   { ok: true, value: T } | { ok: false, error: E };

// function divide(a: number, b: number): Result<number, string> {
//   if (b === 0) {
//     return { ok: false, error: "can't divide by zero" };
//   } else {
//     return { ok: true, value: a / b };
//   }
// }

// let res = divide(10, 2);

// if (res.ok) {
//   console.log("Answer is:", res.value);
// } else {
//   console.log("Oops:", res.error);
// }


interface car{

  name: string;
  age: number;
  call?(a?: number): number;

}

