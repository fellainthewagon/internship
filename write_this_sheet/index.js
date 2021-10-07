const { request } = require("undici");
const fs = require("fs");
const path = require("path");

class NBRB {
  constructor() {
    this.uri = "https://www.nbrb.by/API/";
    this.folder = "output";
  }

  async writeData() {
    try {
      const currencies = await this.#getAllCarrencies();

      const date = new Date();
      const startDate = new Date(date.setMonth(date.getMonth() - 3))
        .toISOString()
        .split("T")[0];
      const endDate = new Date().toISOString().split("T")[0];

      if (!fs.existsSync(this.folder)) fs.mkdirSync(this.folder);

      for (const curr of currencies) {
        await this.#writeFile(curr, startDate, endDate);
      }
    } catch (error) {
      console.error("Something went wrong...\n", error);
    }
  }

  async #writeFile(curr, startDate, endDate) {
    const params = new URLSearchParams({ startDate, endDate });

    const { body } = await request(
      this.uri + `exrates/rates/dynamics/${curr.Cur_ID}?` + params
    );
    const data = await body.json();

    const stream = fs.createWriteStream(
      path.join(
        __dirname,
        this.folder,
        `${curr.Cur_Abbreviation}_${startDate}—${endDate}.txt`
      )
    );
    data.forEach((obj) =>
      stream.write(`${obj.Date.split("T")[0]} | ${obj.Cur_OfficialRate} BYN\n`)
    );
  }

  async #getAllCarrencies() {
    const params = new URLSearchParams({ periodicity: 0 });
    const { body } = await request(this.uri + "exrates/rates?" + params);

    return body.json();
  }
}

const nbrb = new NBRB();
nbrb.writeData();
