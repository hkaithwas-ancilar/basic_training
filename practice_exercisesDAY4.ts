//question 1

class Stack<T>{
    private array: T[] = [];

    push(item: T){
        this.array.push(item);
    }

    pop(item: T){
        return this.array.pop();
    }

    peek(){
        return this.array[this.array.length -1];
    }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);

console.log(stack.peek());
stack.pop(2);

 



//question 2
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

interface Repository<T> {
  create(item: T): Promise<Result<T, Error>>;
  findById(id: string): Promise<Result<T | null, Error>>;
  update(item: T): Promise<Result<T, Error>>;
  delete(id: string): Promise<Result<boolean, Error>>;
}

interface User {
  id: string;
  name: string;
}

class UserRepository implements Repository<User> {
  private data: User[] = [];

  async create(user: User): Promise<Result<User, Error>> {
    this.data.push(user);
    return { ok: true, value: user };
  }

  async findById(id: string): Promise<Result<User | null, Error>> {
    return { ok: true, value: this.data[0] || null };
  }

  async update(user: User): Promise<Result<User, Error>> {
    return { ok: true, value: user };
  }

  async delete(id: string): Promise<Result<boolean, Error>> {
    return { ok: true, value: true };
  }
}

// Example use
(async () => {
  const repo = new UserRepository();
  await repo.create({ id: "1", name: "Alice" });
  console.log(await repo.findById("1"));
})();




//question 3
function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T): T => {
    return fns.reduceRight((result, fn) => fn(result), arg);
  };
}

const add1 = (x: number) => x + 1;
const square = (x: number) => x * x;

const addThenSquare = compose(square, add1);
console.log(addThenSquare(2));





//question 4
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    updateTimestamp() {
      this.updatedAt = new Date();
    }
  };
}

class User {
  constructor(public name: string) {}
}

const TimestampedUser = Timestamped(User);

const user = new TimestampedUser("Harsh");

console.log(user.name);       
console.log(user.createdAt);  
console.log(user.updatedAt);   

setTimeout(() => {
  user.updateTimestamp();
  console.log(user.updatedAt);
}, 2000);
