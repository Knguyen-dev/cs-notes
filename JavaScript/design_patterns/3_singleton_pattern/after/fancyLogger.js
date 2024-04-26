class FancyLogger {
    constructor() {
        /*
    - If an instance of fancyLogger has already been created, then
    skip, else we create the first instance of fancy logger. We'll
    keep track of a reference of the instance through the '.instance' 
    property. This logic ensures that only one FancyLogger instance is
    created.
    
    - As well as this we return FancyLogger.instance from the constructor
    to ensure that everytime we call the constructor, it willonly return the 
    first created instance
    
    */
        if (FancyLogger.instance == null) {
            this.logs = []
            FancyLogger.instance = this
        }

        return FancyLogger.instance
    }

    log(message) {
        this.logs.push(message)
        console.log(`FANCY: ${message}`)
    }

    printLogCount() {
        console.log(`${this.logs.length} Logs`)
    }
}

// Then we'd export a single instanace, our singleton
const logger = new FancyLogger()

// This ensures the attributes and properties of the class instance can't be modified
Object.freeze(logger)

// Export the instance, then we'd use it in our first and second cases.
export default logger
