const https = require("https");

const ID_USD_OLD = 145;
const ID_USD_NEW = 431;
const MA_DAYS = 30;
const thisYear = new Date().getFullYear();

async function request(id) {
  const params = new URLSearchParams({
    startDate: thisYear + "-01-01",
    endDate: new Date().toISOString().split("T")[0],
  });

  return new Promise((resolve, reject) => {
    const req = https.get(
      `https://www.nbrb.by/API/exrates/rates/dynamics/${id}?${params}`,
      (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`Status Code: ${res.statusCode}`));
        }

        const data = [];

        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () => {
          const body = JSON.parse(Buffer.concat(data).toString());
          return resolve(body);
        });
      }
    );

    req.on("error", reject);
    req.end();
  });
}

(async () => {
  try {
    const currencies = [
      ...(await request(ID_USD_OLD)),
      ...(await request(ID_USD_NEW)),
    ];

    let arrayMA = [];
    const output = currencies.map(
      ({ Date: date, Cur_OfficialRate: course }) => {
        arrayMA.push(course);

        const data = {
          date: date.split("T")[0],
          course,
          movingAverageCourse: "n/a",
        };

        if (arrayMA.length >= MA_DAYS) {
          data.movingAverageCourse = +(
            arrayMA.reduce((a, b) => a + b, 0) / MA_DAYS
          ).toFixed(4);

          arrayMA.shift();
        }

        return data;
      }
    );

    console.log(output);
  } catch (error) {
    console.error("Something went wrong...\n", error);
  }
})();
