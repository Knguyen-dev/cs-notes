

# ISO Format
- An example is '2019-11-14T00:55:31.820Z'. The 'T' in the middle separates 
  the 'year-month-day' portion from the 'hour-minute-second' portion. 
  In this special case the 'Z' at the end indicates that this ISO string is 
  in UTC format. So there's no offset from UTC time since it is in UTC time.
  Here are some other examples: 

1. "2024-02-29T10:30:00-05:00"; This 5 hours behind UTC time, which is why EST is called UTC-5. 
  So this is actually February 29th, 2024 at 10:30Am EST.
  But in the same moment in UTC time is 15:30 (3:30 pm), which is "2024-02-29T15:30:00Z"

- NOTE: Remember ISO 8601 is a date format, while UTC is just a way of tracking time.
  You'll see people use GMT and UTC interchangeably because for regular business apps 
  there's less than a second's difference.

2. "2019-11-14T01:55:31.820+01:00"; This is Africa/Tunis time, and it is one hour ahead 
  of UTC time. AN offset of 1 hour.

- NOTE: If ISO 8601 date string lacks a time zone indicator such as an offset or 'Z' for UTC,
  then it's just widely accepted to default to the local time zone of the system that's 
  parsing the staring. This happens in Luxon and many other datetime libraries, so if 
  your timestamp doesn't have that timezone indicator, they'll just default to the local time 
  of the system running the code.

# Credits:
1. https://stackoverflow.com/questions/58847869/utc-vs-iso-format-for-time
2. https://moment.github.io/luxon/#/tour
  