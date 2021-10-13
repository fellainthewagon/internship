const Module = require("./module");

const postData = JSON.stringify({
  title: "How much does a banana cost?",
  body: "One billion dalla for kilo.. But today it has discount, new price for you is 1 baks. Good deal for kilo!",
  userId: 1,
});

Module.get("https://jsonplaceholder.typicode.com/posts/1/comments")
  .then((data) => console.log(JSON.parse(data)))
  .catch((error) => console.error(error));

Module.post("https://jsonplaceholder.typicode.com/posts", postData)
  .then((data) => console.log(JSON.parse(data)))
  .catch((error) => console.error(error));
