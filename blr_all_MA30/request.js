const https = require("https");

module.exports = async function request(uri) {
  return new Promise((resolve, reject) => {
    const req = https.get(uri, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`Status Code: ${res.statusCode}`));
      }

      const data = [];

      res.on("data", (chunk) => data.push(chunk));
      res.on("end", () => {
        const body = JSON.parse(Buffer.concat(data).toString());
        return resolve(body);
      });
    });

    req.on("error", reject);
    req.end();
  });
};
