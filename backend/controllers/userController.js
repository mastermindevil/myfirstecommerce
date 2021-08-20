const asyncHandler = require('express-async-handler')
const { Error } = require('mongoose')
const User = require('../models/usersModels')
const generateToken = require('../utils/generateToken')

// @desc Auth user & token
// @route POST/api/users/login

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
            res.status(401)
            throw new Error ('Invalid email or password')
    }
})


// @desc Reister user
// @route POST/api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
           _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc get user details
// @route GET/api/users/profile

const getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)
    if (user) {
         res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not Found')
    }
})


// @desc update user details
// @route PUT/api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)
    if (user) {
         
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
       
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })


    }
    else {
        res.status(404)
        throw new Error('User not Found')
    }
})


// @desc get all user
// @route GET/api/users
const getUsers = asyncHandler(async (req, res) => {
    
    const user = await User.find()
    res.json(user)

})

// @desc Delete a  user
// @route DELETE/api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove();
        res.json({ message: 'User Removed' })
        
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc get user by id
// @route GET/api/users/:id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user)
        res.json(user)
    else {
        res.status(404)
        throw new Error('User not found')
    }

})



// @desc update user details by admin
// @route PUT/api/users/:id
const updateUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.isAdmin!== null)
            user.isAdmin = req.body.isAdmin
        
       
        const updatedUser = await user.save()
    
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    }
    else {
        res.status(404)
        throw new Error('User not Found')
    }
})





module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
}