const express = require('express')
const router = express.Router()

const  { getAllUsers, 
    getUser,
    createUser,
    deleteUser,
    editUser
} =  require('../controllers/userControllers')
const { isAuthenticated } = require('../middleware/authVerify')

router.get('/', getAllUsers)

router.get('/:id', isAuthenticated, getUser)

router.post('/', createUser)

// Update User
router.patch('/:id', editUser)

router.delete('/:id', deleteUser)

module.exports = router