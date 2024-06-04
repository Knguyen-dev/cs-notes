// Require our mongodb file
require("./config/db");

const app = require("express")();
const { CustomError, createError, jsonifyError } = require("./middleware/errorUtils");
const port = 3000;


// Bodyparser
const bodyParser = require("express").json;
app.use(bodyParser());


// Error handler
app.use(function (err, req, res, next) {

    
    if (err instanceof CustomError) {
        const errJson = jsonifyError(err);
        res.status(err.statusCode).json(errJson);
    } else {
        const serverErr = createError(500, "Server Error!");
        const errJson = jsonifyError(serverErr);
        res.status(serverErr.statusCode).json(errJson);
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})