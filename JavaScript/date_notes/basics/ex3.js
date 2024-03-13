/*
+ How to convert UTC Time to a user's local time 


1. Get the UTC Date. Get your utc date string and make it a javascript date object.
2. Get the timezone offset.



*/

const utcDateString = "2023-06-29T16:45:06.387Z"
const utcDate = new Date(utcDateString)


const offsetMinutes = utcDate.get