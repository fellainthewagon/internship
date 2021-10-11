# Write This Sheet

### Description

Using the API of the National Bank of the Republic of Belarus for each available currency, extract exchange rate data for the last 3 months.

Case 1:
write this data to a file named according to the folowing template: `<currency>_<date-start>-<date-end>.txt`;

Case 2:
combine currencies and write them to a file named according to the: `BLR/all_<date-start>-<date-end>.txt template`.

### Usage

```sh
cd internship/write_this_sheet
npm i

npm run dev:apart - case 1
or
npm run dev:together - case 2
```
