const express = require('express');
const app = express();
const dotenv= require('dotenv');
const path = require('path'); //node already have this module
const cors = require('cors');
const connectDatabase=require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

const products=require('./routes/product');
const orders=require('./routes/order');

connectDatabase();


app.use(express.json())  ; //middleware - it parses json and check the request is also having same json type
app.use(cors());
app.use('/api/v1',products);
app.use('/api/v1',orders);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '..', 'frontend',  'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
    });
}

app.get('/', (req, res) => {
    res.send('Hello, World!');
});




app.listen(process.env.PORT,()=>{
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`);
    console.log(`Database url:${process.env.DB_URL}`);

})