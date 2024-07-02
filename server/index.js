const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
const EmployeeModel = require('./models/Employee')
const SaleModel = require('./models/Sale');

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee");


app.post("/login", (req, res) => {
  const {email, password} = req.body;
  EmployeeModel.findOne({email: email})
  .then(user => {
     if(user) {
        if(user.password === password) {
           res.json("Success")
        } else {
           res.json("incorrect password")
        }
     } else {
        res.json("User not registered")
     }
  })
})

app.post('/register', (req, res) => {
   EmployeeModel.create(req.body)
   .then(employees => res.json(employees))
   .catch(err => res.json(err))
})

app.post('/dashboard', (req, res) => {
   SaleModel.create(req.body)
   .then(sales => res.json(sales))
   .catch(err => res.json(err))
})


app.listen(3001, () => {
   console.log("server is running")
})

