require("dotenv").config();
const app = require("./src/app");
const config = require("./src/config");

const { port, host } = config.app;

app.listen(port, host, () => {
  global.console.log(`Server has been started! | ${host}:${port}`);
});
