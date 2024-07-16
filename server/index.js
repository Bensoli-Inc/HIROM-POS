const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const EmployeeModel = require('./models/Employee')
const SaleModel = require('./models/Sale');
const stockModel = require('./models/Received-stock')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee");

//AUTH APIS
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


//STOCK APIS
app.get('/incomingstock', async (req,res) => {
   try {
      const stock = await stockModel.find().sort({ date: -1 });;
      res.status(200).json(stock);
   } catch (err) {
      res.status(500).json({ message: 'error occurred displaying', error: err });
   }
 })

app.post('/incomingstock', (req,res)=> {
   stockModel.create(req.body)
   .then(stock => res.json(stock))
   .catch(err => res.json(err))
})

 app.get('/finalstock', async (req,res) => {
   try {
      const stockData = await stockModel.find({ status: { $ne: 'Pending' } }).sort({ date: -1 });;
      res.status(200).json(stockData);
   } catch (err) {
      res.status(500).json({ message: 'An error occurred updating stock', error: err });
   }
 })



 app.put('/newstock/approve/:id', (req, res) => {
   stockModel.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true })
       .then(stock => res.json(stock))
       .catch(err => res.status(400).json({ error: err.message }));
});
 
app.delete('/newstock/:id', (req, res) => {
   stockModel.findByIdAndDelete(req.params.id)
       .then(() => res.json({ message: 'stock deleted' }))
       .catch(err => res.status(400).json({ error: err.message }));
});

//SALE APIs
app.post('/sale', async (req, res) => {
  const {itemName, quantity, pieces} = req.body
  try {
   const stockItem = await stockModel.findOne({itemName, quantity})

   if(!stockItem) {
      return res.status(404).json({message: 'Item not found in stock'})
   }
   if(stockItem.pieces<pieces) {
      return res.status(400).json({message: 'Item out of stock'})
   }

   const sellingPricePQ = stockItem.pricePerQuantity * 1.25;
   const total = sellingPricePQ * pieces;

   const newSale = await SaleModel.create({
      itemName,
      quantity,
      pieces,
      sellingPricePQ,
      total,
      status: 'Pending',
      date: new Date(),
   });

   stockItem.pieces -= pieces;
   await stockItem.save();

   res.status(201).json(newSale);
  } catch (err) {
   res.status(500).json({message: 'error on post /sale api', error: err});
  }
})

app.get('/sale', async (req, res) => {
   try {
      const sales = await SaleModel.find().sort({ date: -1 });;
      res.status(200).json(sales);
   } catch (err) {
      res.status(500).json({ message: 'An error occurred', error: err });
   }
});

app.get('/approvedsale', async (req, res) => {
   try {
      const sales = await SaleModel.find({status: {$ne: 'Pending'}}).sort({ date: -1 });;
      res.status(200).json(sales);
   } catch (err) {
      res.status(500).json({ message: 'An error occurred', error: err });
   }
});

app.put('/sale/approve/:id', (req, res) => {
   SaleModel.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true })
       .then(stock => res.json(stock))
       .catch(err => res.status(400).json({ error: err.message }));
});


app.delete('/sale/delete/:id', (req, res) => {
   SaleModel.findByIdAndDelete(req.params.id)
       .then(() => res.json({ message: 'stock deleted' }))
       .catch(err => res.status(400).json({ error: err.message }));
});

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

