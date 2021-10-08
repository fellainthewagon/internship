const { request } = require("undici");
const { promises: fs, createWriteStream, existsSync } = require("fs");
const path = require("path");

class NBRB {
  constructor() {
    this.uri = "https://www.nbrb.by/API/";
    this.folder = "output";
    this.innerFolder = "BLR";
    this.mode = process.env.MODE;
  }

  async saveDataToDisk() {
    try {
      const currencies = await this.#getAllCarrencies();

      const date = new Date();
      const startDate = new Date(date.setMonth(date.getMonth() - 3))
        .toISOString()
        .split("T")[0];
      const endDate = new Date().toISOString().split("T")[0];

      if (!existsSync(path.join(__dirname, this.folder)))
        await fs.mkdir(path.join(__dirname, this.folder));

      const params = new URLSearchParams({ startDate, endDate });

      switch (this.mode) {
        case "apart":
          this.#writeFilesApart(currencies, params, startDate, endDate);
          break;
        case "together":
          this.#writeFilesTogether(currencies, params, startDate, endDate);
          break;
        default:
          throw new Error("Not implemented!");
      }
    } catch (error) {
      console.error("Something went wrong...\n", error);
    }
  }

  async #writeFilesTogether(currencies, params, startDate, endDate) {
    if (!existsSync(path.join(__dirname, this.folder, this.innerFolder)))
      await fs.mkdir(path.join(__dirname, this.folder, this.innerFolder));

    const stream = createWriteStream(
      path.join(
        __dirname,
        this.folder,
        this.innerFolder,
        `all_${startDate}—${endDate}.txt`
      )
    );

    const arr = [];
    for (const curr of currencies) {
      const data = await this.#getCurrencyRates(curr, params);
      const dataString = data
        .map(
          (obj) => `${obj.Date.split("T")[0]} | ${obj.Cur_OfficialRate} BYN\n`
        )
        .join("");

      arr.push(
        `${curr.Cur_Abbreviation} — ${curr.Cur_Scale} ${curr.Cur_Name}\n` +
          "_______________________\n" +
          dataString
      );
    }

    arr.forEach((curr) => {
      stream.write(curr + "\n\n");
    });
  }

  async #writeFilesApart(currencies, params, startDate, endDate) {
    for (const curr of currencies) {
      const data = await this.#getCurrencyRates(curr, params);
      const dataString = data
        .map(
          (obj) => `${obj.Date.split("T")[0]} | ${obj.Cur_OfficialRate} BYN\n`
        )
        .join("");

      const stream = createWriteStream(
        path.join(
          __dirname,
          this.folder,
          `${curr.Cur_Abbreviation}_${startDate}—${endDate}.txt`
        )
      );

      stream.write(
        `${curr.Cur_Scale} ${curr.Cur_Name}\n` +
          "_______________________\n" +
          dataString
      );
    }
  }

  async #getCurrencyRates(curr, params) {
    const { body } = await request(
      this.uri + `exrates/rates/dynamics/${curr.Cur_ID}?` + params
    );
    return body.json();
  }

  async #getAllCarrencies() {
    const params = new URLSearchParams({ periodicity: 0 });
    const { body } = await request(this.uri + "exrates/rates?" + params);

    return body.json();
  }
}

const nbrb = new NBRB();
nbrb.saveDataToDisk();
