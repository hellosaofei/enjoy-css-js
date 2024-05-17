const pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected";

class MyPromise {
  constructor(exector) {
    this.status = pending;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === pending) {
        this.status = fulfilled;
        this.value = value;

        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === pending) {
        this.status = rejected;
        this.value = reason;

        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    exector(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    if (this.status === fulfilled) {
      onFulfilled(this.value);
    } else if (this.status === rejected) {
      onRejected(this.reason);
    } else {
      this.status === pending;
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

export { MyPromise };
