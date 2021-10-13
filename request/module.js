module.exports = class Module {
  static async get(url) {
    return this.#request(url, "GET");
  }

  static async post(url, data) {
    return this.#request(url, "POST", data);
  }

  static async #request(url, method, postData) {
    const { protocol, options } = this.#prepareOptions(url, method);
    const nodeProtocol = this.#protocolType[protocol];

    if (!nodeProtocol)
      throw new Error("The protocol must be 'http' or 'https'.");

    return new Promise((resolve, reject) => {
      const req = nodeProtocol.request(options, (res) => {
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
      if (postData) req.write(postData);
      req.end();
    });
  }

  static #protocolType = {
    http: require("http"),
    https: require("https"),
  };

  static #prepareOptions(url, method) {
    const [protocol, rest] = url.split("://");
    const [hostPort, ...path] = rest.split("/");
    const [host, port] = hostPort.split(":");

    return {
      protocol,
      options: {
        method,
        host,
        port: port || protocol === "https" ? 443 : 80,
        path: "/" + path.join("/") || "/",
        headers: {
          "Content-Type": "application/json",
        },
      },
    };
  }
};
