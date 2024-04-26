import logFirstImplementation from "./firstUse.js"
import logSecondImplementation from "./secondUse.js"

/*
- Situation: Let's say we want to keep an accurate track of the number of 
logs throughout the application. We'll, with how we're doing it, this is 
incorrect as we're referencing/using two different log instances, rather than 
just one! As a result it'll be 0 => 1, and 0 => 1. To achieve the original 
idea, we need to be referencing and tracking only one fancy logger instance! So
we'll use the singleton pattern for that.
*/
logFirstImplementation()
logSecondImplementation()
