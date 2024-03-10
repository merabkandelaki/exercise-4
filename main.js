const promiseReject = document.querySelector(".promise-reject");
const promiseAll = document.querySelector(".promise-all");
const promiseRace = document.querySelector(".promise-race");
const definitionPromiseAllPromiseRace = document.querySelector(
  ".definition-promiseall-promiserace"
);
const randomNumberValue = document.querySelector(".random-number");
const dataError = document.querySelector(".data-error");
const objectText = document.querySelector(".object-text");
const refreshBtn = document.querySelector(".refresh-btn");

setTimeout(refresh, 4000);
function refresh() {
  window.location.reload();
}
refreshBtn.addEventListener("click", refresh);

// Exercise - 1:
// Promise.all, Promise.race
/**Create multiple promises that resolve after different delays.
 Use Promise.all to execute code after all promises have resolved,
and use Promise.race to handle the first resolved promise.
Explain the difference between these methods **/
const prom1 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Promise 1 resolved"), 900)
);
const prom2 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Promise 2 resolved"), 900)
);
const prom3 = new Promise((resolve, reject) =>
  setTimeout(() => reject("Promise 3 rejected"), 900)
);
const promArray = [prom1, prom2, prom3];
Promise.all(promArray)
  .then((results) => {
    console.log("All promises resolved:", results);
  })
  .catch((error) => {
    promiseReject.innerText = `At least one promise rejected: ${error}`;
    promiseReject.style.color = "red";
    console.error("At least one promise rejected:", error);
  });
//=====================================//
const p1 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Promise 1 resolved"), 1000)
);
const p2 = new Promise((resolve, reject) =>
  setTimeout(() => resolve(" Promise 2 resolved"), 990)
);
const p3 = new Promise((resolve, reject) =>
  setTimeout(() => resolve(" Promise 3 resolved"), 980)
);

const promisesArray = [p1, p2, p3];

Promise.all(promisesArray)
  .then((results) => {
    promiseAll.innerText = `All promises resolved: ${results}`;
    console.log("All promises resolved:", results);
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  });

Promise.race(promisesArray)
  .then((results) => {
    promiseRace.innerText = `First promise resolved: ${results}`;
    definitionPromiseAllPromiseRace.innerText =
      "განსხვავება Promise.all-სა და Promise.race-ს შორის - Promise.all ელოდება ყველა Promise-ს შესრულებას. თუ რომელიმე არ შესრულდება, მაშინ Promise.all დარეჯექტდება. Promise.race Promise-ბის სიიდან აბრუნებს იმ Promise-ს, რომელიც ყველაზე პირველი სრულდება.";
    console.log("First promise resolved:", results);
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  });

// Exercise - 2:
// Using Promises, async/await
/** Implement error handling mechanisms for asynchronous operations using promises 
 and async/await. Include examples that handle both successful and failed promises.

If the value of the variable random is less than 0.5, he resolve function is called with the argument "Data fetched successfully".
 This means that the asynchronous operation completed successfully, and the promise should be resolved with the provided data.

If the value of the variable random is greater than or equal to 0.5, the reject function is called with the argument "Error: Unable to fetch data". This means that an error occurred during the asynchronous operation, and the promise should be rejected with the provided error message.
 **/
function fetchDataRandomNumber() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      randomNumberValue.innerText = `Random Number: ${randomNumber.toFixed(4)}`;
      console.log(randomNumber);
      if (randomNumber < 0.5) {
        resolve("Data: Data fetched successfully");
      } else {
        reject(new Error("Error: Unable to fetch data"));
      }
    }, 1100);
  });
}
async function getData() {
  try {
    const data = await fetchDataRandomNumber();
    dataError.innerText = data;
    console.log(data);
  } catch (error) {
    dataError.innerText = error.message;
    randomNumberValue.style.color = "red";
    dataError.style.color = "red";
    console.error(error.message);
  }
}
getData();

// CHALLENGE:
const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ text: "This is a cat!" });
  }, 1200);
});
const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ text: "This is a dog!" });
  }, 1200);
});

const myObject = {};

Promise.all([promise1, promise2])
  .then((results) => {
    myObject.text = results?.[0]?.text + " " + results?.[1]?.text;
    objectText.innerText = `Text: ${myObject.text}`;
    console.log(myObject);
  })
  .catch((error) => {
    console.log(error);
  });

async function fetchData() {
  try {
    const result1 = await promise1;
    const result2 = await promise2;

    if (result1 && result2) {
      myObject.text = `${result1.text} ${result2.text}`;
    }
  } catch (error) {
    console.log(error);
  }
}
fetchData();
