const express = require('express');
const mutantApi = require('./routes/mutantApi.js');
const app = express();

app.use(express.json());

app.use("/mutant", mutantApi);

app.use((req,res,next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});
 
app.use((err,req, res, next) => {
   res.status(err.status || 501);
   res.json({
       error: {
           code: err.status || 501,
           message: err.message
       }
   });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Escuchando en puerto", PORT));

module.exports = app;