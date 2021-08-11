const express = require("express")

const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.json({
        "greet": "Hello World"
    })
})

app.post("/ping", (req, res) => {
    console.log(req.query)
    res.sendStatus(204)
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})