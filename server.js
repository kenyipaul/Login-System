const express = require('express')
const cors = require('cors')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const connectDB = require('./src/config/db.config.js')

const { signupRouter, loginRouter, homeRouter, logoutRouter, delAccRouter } = require('./src/middleware/registration')

const app = express()
const PORT = 3303

app.use(session({
    secret: 'yourdad122',
    resave: false,
    saveUninitialized: false,
    // store: new FileStore({ path: './sessions' }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }
}))

connectDB()

app.use(cors({ origin: '*', methods: ['post', 'get']}))
app.use(express.urlencoded({extended: false}))
app.use(express.static('dist'))

app.post('/login', loginRouter)
app.post('/signup', signupRouter)
app.post('/home', homeRouter)
app.post('/logout', logoutRouter)
app.post('/delAcc', delAccRouter)

app.use(function (req, res) {
    res.status(404)
    res.type('text/plain')
    res.send('404 | Page Not Found')
})

app.listen(PORT, err => {
    console.log(`Server listening on port localhost:${PORT}`)
})