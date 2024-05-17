import { MyPromise } from "./index.js";

let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 3000);
});

promise.then(
  (value) => {
    console.log("fulfilled", value);
  },
  (reason) => {
    console.log("fulfilled", reason);
  }
);

promise.then(
  (value) => {
    console.log("fulfilled", value);
  },
  (reason) => {
    console.log("fulfilled", reason);
  }
);
