import { log } from "console"
import express from "express"
import { connect } from "http2"
import jwt from "jsonwebtoken"
import mongoos from "mongoos"
import {registerValidation} from "./validations/auth.js";


mongoos.connect('mongodb+srv://admin:123456@cluster0.gdk3dmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("DB.ok")).catch((err) => console.log("error",err))
const app = express()

app.get('/', (req,res) => {
    res.send("hello World!  ")
})
app.use(express.json())
app.post("/auth/login", registerValidation, (req,res) => {
    console.log(req.body)

    const token = jwt.sign({
        email: req.body.email,
        fullName: "Rinat Dosmatov"
    },"secret123")
    res.json({
        success: true,
        token,
    })
})

app.listen(8888, (err) => {
    if(err){
        return console.log(err);    
    }

    console.log("OK");
} )