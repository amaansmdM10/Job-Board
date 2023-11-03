const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const authroutes = require("./routes/authroutes");




//routes

app.use('/api',authroutes);


//Database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>console.log("DB connected"))
.catch((err)=> console.error(err));


app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit : '5mb',
    extended:true
}))
app.use(cors());
app.use(cookieParser());


//middleware
app.use(errorHandler);

const port = process.env.Port || 8000

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
});