import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

import productRouter from './route/productRoute.js'

dotenv.config();

const app = express();
app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));
app.use(cors());
app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
app.use(xss());
app.use(mongoSanitize());


const PORT = process.env.PORT || 5001;


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> app.listen(PORT, ()=> console.log(`server running on port ${PORT}`)))
.catch((error)=> console.log(error.message));


app.get('/', function(req, res){
    res.send({ title: 'Welcome to API homepage' });
});

app.use("/product", productRouter )
