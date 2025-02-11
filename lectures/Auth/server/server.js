const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const app = express()

app.use(cors(
    { origin: 'http://localhost:5173' }
))

const Schema = mongoose.Schema

const AuthSchema = new Schema(
    {

        username:
        {
            type: String,
            required: true
        }
        ,
        password: {
            type: String,
            required: true

        },
        created: Number

    }
)
const Auth = mongoose.model('Auth', AuthSchema)



require('dotenv').config()

app.use(express.json())

app.post("/register", (req, res) => {

    console.log("Reg hit", req.body)
    Auth.create(req.body)
        .then(created => {
            console.log("created", created)
            res.status(201).json(created)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Internal Server Error" })
        })
}
)

app.post("/login", (req, res) => {
    console.log("login", req.body)

    



}
)


const PORT = 3000

app.listen(PORT, () => {

    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connected to Database")
    })
    console.log(`Server is running on port: ${PORT}`);
});
