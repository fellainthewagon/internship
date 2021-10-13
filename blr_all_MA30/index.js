const { createWriteStream, existsSync, mkdirSync } = require("fs");
const path = require("path");
const request = require("./request");

const MA_DAYS = 30;
const FOLDER = "output";

async function output() {
  const pathOutput = path.join(__dirname, FOLDER);
  if (!existsSync(pathOutput)) mkdirSync(pathOutput);

  const IDs = require("./IDs.json");
  const thisYear = new Date().getFullYear();
  const params = new URLSearchParams({
    startDate: thisYear + "-01-01",
    endDate: new Date().toISOString().split("T")[0],
  });

  IDs.forEach(async ({ ID, ID_OLD, NAME }) => {
    const rates = [
      ...(await request(
        `https://www.nbrb.by/API/exrates/rates/dynamics/${ID_OLD}?${params}`
      )),
      ...(await request(
        `https://www.nbrb.by/API/exrates/rates/dynamics/${ID}?${params}`
      )),
    ];

    const stream = createWriteStream(pathOutput + `/BYN_${NAME}_MA30.txt`);
    stream.write("Date | Course | MA \n" + "____________________\n\n");

    let arrayMA = [];
    const output = rates.map(({ Date: date, Cur_OfficialRate: course }) => {
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

      stream.write(
        data.date + " | " + course + " | " + data.movingAverageCourse + "\n"
      );

      return data;
    });

    console.log(`\n${NAME}:\n`, output);
  });
}

output();
