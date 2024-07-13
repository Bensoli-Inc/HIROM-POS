const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
const EmployeeModel = require('./models/Employee')
const SaleModel = require('./models/Sale');
const stockModel = require('./models/Received-stock')

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

//fetching sales data from mongodb
app.get('/approved', async (req, res) => {
   try {
      const sales = await SaleModel.find().sort({ date: -1 });;
      res.status(200).json(sales);
   } catch (err) {
      res.status(500).json({ message: 'An error occurred', error: err });
   }
});

app.get('/stock', async (req,res)=>{
   try{
      const stock = await SaleModel.find().sort({ date: -1 });
      res.status(200).json(stock);
   } catch (err) {
      res.status(500).json({message: 'error displaying stock', error: err});
   }
})

app.get('/name'), async (req,res) => {
   try{
      const name = await EmployeeModel.find()
      res.status(200).json(name);
   } catch (err) {
      res.status(500).json({message: 'error dislaying authorized name', error: err});
   }
}

// app.post('/stock', (req,res)=>{
//    stockModel.create(req.body)
//    .then(stock => res.json(stock))
//    .catch(err => res.json(err))
// })

app.listen(3001, () => {
   console.log("server is running")
})

