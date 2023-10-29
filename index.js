const express = require("express");
const { userRouter } = require("./routes/user.route");
const { connection } = require("./db");

const { auth } = require("./middlewares/auth.middleware");
const { notesRouter } = require("./routes/notes.route");
require('dotenv').config()
const app = express();

app.use(express.json());

app.use("/users",userRouter)
app.use("/notes",auth,notesRouter);

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("db is connected")
        console.log("Server is running")

    } catch (error) {
        console.log(error)
    }
})