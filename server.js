require('dotenv').config()
require('express-async-errors');
//async errors

const express = require('express')
const app = express()

const sequelize = require('./DB/connect')
const productsRouter = require('./routes/productRoutes')
const usersRouter = require('./routes/userRoutes')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler');
const User = require('./models/user');

//middleware
app.use(express.json())

//routes

sequelize.sync({ force: false })
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Error syncing database: ", err));

app.get('/', (req, res) => {
    res.status(200).send('<h1>Store API</h1><a href="/api/v1/products">products</a><hr><a href="/api/v1/products/static">testing</a><hr><a href="/api/v1/users">users</a><hr><a href="/api">api</a>')
})

app.get('/users', async (req, res) => {
    const Users = await User.findAll();
    res.json(Users)
})

app.post('/users', async (req, res) => {
    const { name, email, username, password } = req.body;
    const newUser = await User.create({ name, email, username, password });
    res.json(newUser)
})


//the api is set as "/api" and the data is in the res.json
app.get("/api", (req,res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "Guanghui Ma", "musab"]})
})

app.use("/api/v1/products", productsRouter) //products route

app.use("/api/v1/users", usersRouter)

//products route


app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 5001 //port set to 5001

const start = async () => {
    try {
        // connectDB
        await sequelize.authenticate()
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
// app.listen(5001, () =>{ console.log("Server started on port 5001")}) 