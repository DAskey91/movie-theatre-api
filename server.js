const express = require("express");
const app = express()
const port = 3000

const userRoutes = require("./routes/Users")
app.use("/users", userRoutes)

const showRoutes = require("./routes/Shows")
app.use("/shows", showRoutes)

app.listen(port, function (){
    console.log("Listening on port " + port)
})
