/*
+ Intro DateTime Object: Luxon works with the 'DateTime' object, which 'represents a specific milisecond in time,
  along with a timezone and locale (which is just your extra region related info). Here we'll 
  cover how to use and format Luxon DateTime objects.

*/

const { DateTime } = require("luxon");

/*
- Example 1: Creating a Datetime object for May 15, 2017 at 8:30 AM.
  So DateTime.local(year, month, day, hour, minute, seconds, ms). See how months 
  aren't zero-indexed with luxon. When creating it, we have the 'ts' timestamp
  property which gives our ISO 8601 date string. So here it records our 
  locale, timezone, and creates the ISO 8601 string with the offset from UTC.
  Of course it gets this info from the system where the code is executed!
*/
function ex1() {
	const dt1 = DateTime.local(2017, 5, 15, 8, 30); // DateTime { ts: 2017-05-15T08:30:00.000-04:00, zone: America/Indianapolis, locale: en-US }

	// Equivalent to calling DateTime.local() without arguments.
	// But here we get a DateTime object representing the current moment.
	const dt2 = DateTime.now();

	// Can also create a DateTime object from objects. Don't worry about the properties yet, just know you can do this.
	const dt3 = DateTime.fromObject(
		{ day: 22, hour: 12 },
		{ zone: "America/Los_Angeles" }
	);

	// Creating a DateTime object from an ISO 8601 string. May 15th, 2017 at 8:30 AM.
	// Note that since there's no timezone indicator, Luxon will default to the local time of the
	// system running the code.
	const dt4 = DateTime.fromISO("2017-05-15T08:30:00");
}

/*
- Example 2: Some common and more niche accessors and properties you can get from the DateTime object.
*/
function ex2() {
	const dt = DateTime.fromISO("2017-05-15T08:30:00");

	const ISO_DATE_STRING = dt.toString(); // "2017-05-15T08:30:00" basically the date string we entered
	const year = dt.year; // 2017
	const month = dt.month; // 5
	const day = dt.day; // 15
	const hour = dt.hour; // 8, you could keep going with minutes, seconds, ms.

	const zoneName = dt.zoneName; // 'America/Indianapolis'

	// Gets the offset of this DateTime object from UTC time in minutes. Given that
	// our zone is 'America/Indianapolis', we're actually behind 4 hours from UTC, so
	// the offset is NEGATIVE 240 minutes.
	const offSetMinutes = dt.offset;

	// returns number of days in the current month of the DateTime object
	const daysInMonth = dt.daysInMonth;
}

/*
- Example 3: How to format luxon's DateTime object to be readable 
  by a human or by a machine. For machines use ISO. In this example, we're going to be exploring 
  formatting for humans. To create strings for humans do dt.toLocaleString(format). You
  can pass in a format so that we get different date string formats for displaying.
  Those are just presets, and they build off of the Intl api. 
  

+ Credits for luxon formatting and Intl: 
1. Luxon: https://github.com/moment/luxon/blob/master/docs/formatting.md
2. Mdn Docs for Intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
*/
function ex3() {
	const dt = DateTime.fromISO("2017-04-20T08:30:00"); //

	const format1 = dt.toLocaleString(); // 4/20/2017, default
	const format2 = dt.toLocaleString(DateTime.DATETIME_FULL); // April 20th, 2017 at 8:30 AM EDT

	/*
  - Essentially, DATETIME_FULL is just an object with values, and here is what it really looks like.
	  These are really just objects you can provide to the Intl.DateTimeFormat class.
	
  */
	const format2Expanded = dt.toLocaleString({
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		timeZoneName: "short",
	});

	/*
  - Since they're just objects, you can modify them as you please. 
  Outputs: 'Apr 20, 2017, 8:30 AM EDT'
  */
	const format2Custom = dt.toLocaleString({
		...DateTime.DATETIME_FULL,
		day: "2-digit",
		month: "short",
	});

	// Set the locale to france, which will change the language to make France.
	const format3 = dt.setLocale("fr").toLocaleString(DateTime.DATETIME_FULL); // 20 avril 2017 à 08:30 UTC−4
}

/*
- Example 4: Formatting DateTime with programmer specific format. For computers,
  use ISO, for humans use toLocaleString, however if you really need a specific 
  format (maybe because some other software uses it), then use toFormat.
  'Tokens' are used to detect the placement of where the date components should 
  go. 

  
- NOTE: It's noted that you should avoid creating ad-hoc strings if possible.
*/

function ex4() {
	const dt = DateTime.fromISO("2017-04-20T08:30:00");

	const format1 = dt.toFormat("yyyy.LLL.dd"); // 2017.Apr.20

	// Of course you can still do setLocale
	const format2 = dt.setLocale("fr").toFormat("yyyy LLL dd"); // 2017 avr. 20
}
ex4();
