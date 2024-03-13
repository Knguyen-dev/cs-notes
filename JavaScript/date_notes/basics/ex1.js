/*
+ Date objects: Objects that contain values that represent dates and times.
  Then we can change and format them to suite our needs.



*/

const date1 = new Date() // Creates date of the current date, with timezone included.

/*
+ Date(year, month, day, hours, minutes, seconds, milliseconds)
1. year: 2024
2. months (0 indexed): January
3. day: 1
4. hours (military time): 2 AM
5. minutes: 3 minutes after 2 AM
6. seconds: 4 seconds after the minute
7. Then finally 5 milliseconds after the second
- Takeaway: About January 1st, 2024 at about 2:03 Am.
*/
const date2 = new Date(2024, 0, 1, 2, 3, 4, 5)

/*
+ You can also pass in a date string as an argument. Here we're 
  passing January 2nd, 2024 at 12:00:00 PM, UTC time. 

*/
const date3 = new Date("2024-01-02T12:00:00Z")

/*
+ Date.now(): This returns the number of milliseconds
  since January 1, 1970, 00. This is known as a "Unix epoch",
  or Unix time. This is used for UTC time because it's not
  storing time in any timezone. Now this is generally
  unreadable, but it's good for keeping things consistent.

+ You can also pass in miliseconds to a date object. By doing this,
  getting the date after our passed amount of miliseconds since January 1, 1970. 
*/
const date4 = Date.now()

/*
+ Get methods: These are self explanatory. Note that 
  there's also a .getDay(), which gets the day of the week such 
  as 'Monday' or 'Tuesday'.
*/
const date = new Date()
const year = date.getFullYear() // 2024; The year 2024
const month = date.getMonth() // 1; indicating February since index 1
const day = date.getDate() // 29; indicating 29th day of february
const hour = date.getHours() // 11; indicating it's 11 Am
const minutes = date.getMinutes() // 32; 11:32 Am
const seconds = date.getSeconds() // 29; indicating 11:32 Am and 29 seconds after the minute
const dayOfWeek = date.getDay() // 4; 0 = Sunday, whilst 6 = Saturday. So 4 is Thursday.

/*
+ Set methods: You can set the properties of your date object.
  Let's set the date to January 1, 2024 at 2:30 Am. Then
  printing it out yields "2024-01-29T07:30:38.262Z" which is called 
  a UTC date string, or a date in string format. The format is ISO 8601 and 
  it holds the date, time, and timezone information. You'd want to store our 
  time information in UTC format, and then display it accordingly. We'll 
  talk about how we can display and deal with timezones in our second part.
  Do myDate.toISOString() to convert a date object into an ISO 8601 string.
*/
const date5 = new Date()
date5.setFullYear(2024)
date5.setMonth(0)
date5.setDate(1)
date5.setHours(2)
date5.setMinutes(30)

const date6 = new Date("2023-12-31")
const date7 = new Date("2024-01-01")

/*
+ Comparing dates: We can compare two date objects. The date object that 
  is greater will be MORE RECENT than the date object that is less.
  This makes sense as we're comparing the miliseconds since unix epoch, so the 
  one with more miliseconds is further away and is therefore more recent.


*/

if (date7 > date6) {
    console.log("Date 7 is more recent")
}
