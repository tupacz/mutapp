const express = require('express');
const mongoose = require('mongoose');
const mutantApi = require('./routes/mutantApi.js');
const stastApi = require('./routes/statsApi.js');
const app = express();

app.use(express.json());

var mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mutantdb';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

var db = mongoose.connection;

db.on('error', function(err){
  console.log('connection error', err)
})

db.once('open', function(){
  console.log('Connection to DB successful')
})

app.use("/mutant", mutantApi);
app.use("/stats", stastApi);

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
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

module.exports = app;