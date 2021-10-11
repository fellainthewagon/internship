# BLR/USD Moving Average

### Description

Using the API data of the National Bank of the Republic of Belarus, extract the BLR/USD rate for the entire current year. For each value, calculate a moving average for the last 30 days.

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
cd internship/blr_usd_MA30
node index.js
```
