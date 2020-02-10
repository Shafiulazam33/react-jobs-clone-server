const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const app=express()
app.get('/', (req, res) => {

    res.json({
        message: 'Welcome To Our Application'
    })
})
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`SERVER is RUNNING ON PORT ${PORT}`)
})