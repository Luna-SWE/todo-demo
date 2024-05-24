const express = require('express');
const mongoose = require('mongoose');
const bodyPaser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();

app.use(bodyPaser.json())
app.use('/api',indexRouter)

const mongoURI = 'mongodb://localhost:27017/todo-demo'

mongoose.connect(mongoURI).then(()=>console.log('mongoose connected')).catch((err)=>console.log('DB connnection fail', err))

app.listen(5500, ()=>console.log('server is on 5500'))