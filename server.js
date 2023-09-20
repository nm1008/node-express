const express = require("express")
const app = express()

const port = process.env.PORT || 8000; 

app.get('/', (req, res) => {
    console.log("get")
    res.send("Hi")
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})