const express = require('express')
const app = express()

//the api is set as "/api" and the data is in the res.json
app.get("/api", (req,res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "Guanghui Ma", "musab"]})
})

app.listen(5001, () =>{ console.log("Server started on port 5001")}) //port set to 500