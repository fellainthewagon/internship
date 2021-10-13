const http = require("http");
const https = require("https");

class Module {
  static async get(url) {
    return new Promise((resolve, reject) => {
      const protocol = url.split("://")[0];
      const protocolType = {
        http: http,
        https: https,
      };

      if (!protocolType[protocol])
        return reject(new Error("The protocol must be 'http' or 'https'."));

      const req = protocolType[protocol].get(url, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`Status Code: ${res.statusCode}`));
        }

        const data = [];
        res.on("data", (chunk) => data.push(chunk));

        res.on("end", () => {
          console.log(`Status Code: ${res.statusCode}`);
          console.log("Headers:", res.headers);

          const body = Buffer.concat(data).toString();
          return resolve(body);
        });
      });

      req.on("error", reject);
      req.end();
    });
  }

  static async post(url) {}
}

Module.get("https://gorest.co.in/public/v1/users")
  .then((data) => console.log(JSON.parse(data)))
  .catch((error) => console.error(error));
