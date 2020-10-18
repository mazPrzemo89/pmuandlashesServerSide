const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
const nocache = require('nocache')
require('dotenv').config()
// import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const photoRoutes = require('./routes/photo')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const bookingRoutes = require('./routes/bookings')
const bookingTimesRoutes = require('./routes/bookingTimes')
const monthRoutes = require('./routes/month')
const daysRoutes = require('./routes/days')
const smsRoutes = require('./routes/sms')
const promotionRoutes = require('./routes/promotion')
const stripeRoutes = require('./routes/stripe')
const aboutRoutes = require('./routes/about')
mongoose.set('useFindAndModify', false);
//app
const app = express()


//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected")
})

// middlewares
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(expressValidator())
app.use(nocache())
app.use(cors())
// routes middlewre
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', bookingRoutes)
app.use('/api', bookingTimesRoutes)
app.use('/api', monthRoutes)
app.use('/api', daysRoutes)
app.use('/api', smsRoutes)
app.use('/api', photoRoutes)
app.use('/api', promotionRoutes)
app.use('/api', stripeRoutes)
app.use('/api', aboutRoutes)

const port = process.env.PORT || 'pmuandlashes.studio'

app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
})
