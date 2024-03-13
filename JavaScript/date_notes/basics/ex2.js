/*
+ Storing and Displaying dates: We want to store our 
  dates as ISO strings (UTC Format), and then display them to our 
  user in different formats.

+ We can use Internationalization API to format your dates. 
  Well why 

*/

const date1 = new Date()

const usDate = Intl.DateTimeFormat("en-US").format(date1) // US format '2/29/2024'
const gbDate = Intl.DateTimeFormat("en-GB").format(date1) // great britain format '29/02/2024'
const jpDate = Intl.DateTimeFormat("ja-JP").format(date1) // japan format '2024/2/29'
