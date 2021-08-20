const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const colors = require('colors');
const errorMiddleware = require('./middleware/errorMiddleware')
const productRoutes = require('./Routes/productRoutes')
const path = require('path')
const userRoutes = require('./Routes/userRoutes')

const notFound = errorMiddleware.notFound;
const ErrorHandler= errorMiddleware.ErrorHandler;

dotenv.config();
connectDB();
const app = express();

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

__dirname = path.resolve()

if(process.env.MODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}else{
    app.get('/', (req, res) => {
        res.send("Api is Running...");
    })
}

app.use(notFound)
app.use(ErrorHandler)


app.listen(process.env.PORT, console.log(`Server Running in ${process.env.MODE_ENV} on port ${process.env.PORT}`.yellow.bold))