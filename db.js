const mongoose = require('mongoose');
const clc=require("cli-color");
mongoose.set('strictQuery', true);
mongoose
.connect(process.env.db,{
 useNewUrlParser: true,
})
.then(() => {
console.log(clc.cyanBright.bold('connected to db'));
 })
.catch((err) => {
console.log(err.message);
 });