const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

const signupRouter = express.Router()
const loginRouter = express.Router()
const homeRouter = express.Router()
const logoutRouter = express.Router()
const delAccRouter = express.Router()
const saltRounds = 10

signupRouter.post('/signup', async (req, res) => {

    const {username, email, password, date } = req.body
    
    await bcrypt.hash(password, saltRounds, (err, hash) => {
        err ? res.status(500).send('Internal Server Error') : '' 
        
        User.create({ 
            name: username,
            email: email,
            password: hash,
            date: date
        
        }).then((response) => {
            return res.send({ error: false, message: 'Signup Successful' })
        
        }).catch(err => {
            if (err.code == 11000) {
                return res.send({ error: true, message: 'Email address already in use' })
            } else {
                return res.status(500).send({ error: true, message: 'Internal Server Error'})
                console.error(err)
            }
        })
    })

})

loginRouter.post('/login', async (req, res) => {

    const { email, password } = req.body
    
    User.findOne({ email }).then((response) => {
        if (response !== null) {
            bcrypt.compare(password, response.password, (err, resp) => {
                err ? res.status(500).send('Internal Server Error') : '' 
                if (resp) {
                    req.session.user = { id: response._id, username: response.name, email: response.email, date: response.date}
                    res.send({ user: true, message: 'Login Successful'})
                } else { 
                    res.send({ user: false, message: 'Email or password is incorrect'})
                }
            })
        } else { return res.send({ error: true, message: 'Email or password is incorrect' }) }
    })

})

homeRouter.post('/home', (req, res) => {
    return res.send(req.session.user)
})


logoutRouter.post('/logout', (req, res) => {

    req.session.user = null 
    req.session.destroy()
    return res.send({ user: false})

})


delAccRouter.post('/delAcc', (req, res) => {
    let user = req.session.user
    User.deleteOne({ name: user.username, email: user.email}).then((response) => {
        return res.send((response))
    }).catch(err => {
        return res.status(500).send('Internal Server Error')
    })
})


module.exports = {
    loginRouter,
    signupRouter,
    homeRouter,
    logoutRouter,
    delAccRouter
}