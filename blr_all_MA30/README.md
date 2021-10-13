# BLR/All Moving Average

### Description

Using the API of the National Bank of the Republic of Belarus, the data of the exchange rate of each currency for the entire current year. Also, for each value of each currency, calculate the monthly moving average.

Ouput:

```
[
	...,
	{
		date: <date>, // any kind of readable format
		course: <number>,
		movingAverageCourse: <number>,
	},
	...,
]
```

### Usage

```sh
cd internship/blr_all_MA30
node index.js
```
