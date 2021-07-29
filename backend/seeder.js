const mongoose = require('mongoose');
const products = require('./data/products');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/Users');
const User = require('./models/usersModels');
const Product = require('./models/productsModels');
const Order = require('./models/orderModels');
const connectDB = require('./config/db')


dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()



        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
      
        await Product.insertMany(sampleProducts);
        console.log('Data Imported!'.green)
        process.exit()

    } catch (error) {
        console.log(`$(error)`.red)
        process.exit(1);
        
    }
}


const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.green)
        process.exit()

    } catch (error) {
        console.log(`$(error)`.red)
        process.exit(1);
        
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}

