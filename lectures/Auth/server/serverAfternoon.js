const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const app = express()
require('dotenv').config()

app.use(cors(
    { origin: 'http://localhost:5173' }
))

const Schema = mongoose.Schema

const AuthSchema = new Schema(
    {

        username:
        {
            type: String,
            required: true,
            unique: true
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




app.use(express.json())

app.post("/register", (req, res) => {

    console.log("Reg hit", req.body)

    Auth.findOne({ username: req.body.username })
        .then(found => {
            console.log("found", found)
            if (!found) {
                console.log("Good username... proceed")

                const hash = bcrypt.hashSync(req.body.password, 10)
                console.log("hash", hash)
                const newUser = new Auth(
                    {
                        username: req.body.username,
                        password: hash
                    }
                )

                Auth.create(newUser)
                    .then(created => {
                        console.log("created", created)
                    })

            } else {
                console.log("Username Taken")
                res.json({ msg: "Username Taken" })

            }
        })




    // Auth.create(req.body)
    //     .then(created => {
    //         console.log("created", created)
    //         res.status(201).json(created)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(500).json({ error: "Internal Server Error" })
    //     })
}
)

app.post("/login", (req, res) => {
    console.log("login", req.body)
    Auth.findOne({ username: req.body.username })
        .then(found => {
            console.log("found", found)

           if(bcrypt.compareSync(req.body.password, found.password)){
                console.log("GOOD LOGIN")
                res.json({msg: "good login", found})
            } else {
                console.log("BAD  LOGIN")
                res.json({msg: "bad login"})
           }
            // if (found.password === req.body.password) {
            //     console.log("Password Good")
            // } else {
            //     console.log("BAD PASS")
            // }
        })
        .catch(err => console.log(err))




}
)


const PORT = 3000

app.listen(PORT, () => {

    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connected to Database")
    })
    console.log(`Server is running on port: ${PORT}`);
});
