const express = require("express")
require('dotenv').config();
const cors = require("cors")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const EmployeeModel = require('./models/User')
const SaleModel = require('./models/Sale');
const stockModel = require('./models/Received-stock')
const RealTimeStockModel = require('./models/Real-Time-stock')
const UserModel = require('./models/User')
const jwt= require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY; 
const bcrypt = require('bcryptjs');
const { authMiddleware, roleMiddleware } = require('./middleware/auth');


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee");
console.log('Secret Key:', process.env.SECRET_KEY);

//AUTH APIS
//reg api
app.post('/register', async (req, res) => {
   try {
      const {username, email, password, institutionName, role} = req.body;
      const user = new UserModel({username, email, password, institutionName, role});
      await user.save();
      res.status(201).json({message: 'User registered Successfully'});
   } catch (err) {
      res.status(400).json({message: 'Error registering user', error: err.message});
   }
});

//login api
app.post('/login', async (req, res) => {
   try {
      const {username, password} = req.body;
      const user = await UserModel.findOne({username});
      if (!user || !await bcrypt.compare(password, user.password)) {
         return res.status(400).json({message: 'invalid username or password'});
      }
      if (!user.isActive) {
         return res.status(403).json({message: 'Account is deactivated. Contact admin.'});
      }
      const token = jwt.sign({_id: user._id, role: user.role}, secretKey, {expiresIn: '1h'});
      res.json({ token, message: `Welcome ${username}`});
   } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: err.message });
   }
});

// Create Admin api (Only Founder)
app.post('create-admin', authMiddleware, roleMiddleware(['founder']), async (req, res) => {
   try {
      const {username, email, password, institutionName} = req.body;
      const admin = newUser({username, email, password, institutionName, role: 'admin'});
      await admin.save();
      res.status(201).json({message: 'Admin created successfully'});
   } catch (err) {
      res.status(400).json({message: 'Error creating admin', error: err.message});
   }
});

// Creating Staff Route (Only Admin)
app.post('/create-staff', authMiddleware, roleMiddleware(['admin']), async (req,res) => {
   try {
      const {username, email, password, institutionName} = req.body;
      const  staff = new UserModel({username, email, password, institutionName, role: 'staff'});
      await staff.save();
      res.status(201).json({message: 'Staff created successfully'});
   } catch (err) {
      res.status(400).json({message: 'Error creating staff', error: err.message});
   }
});


// Deactivate Account (Founder/Admin for Admin/Staff)
app.put('/deactivate/:id', authMiddleware, async (req, res) => {
   try {
      const user = await UserModel.findById(req.params.id);
      if (!user) return res.status(404).json({message: 'user not found'});
      if ((req.user.role === 'admin' && user.role !== 'staff')  || req.user.role === 'staff') {
         return res.status(403).json({message: 'Access denied. You do not have permission to perform this action'});
      }
      user.isActive = false;
      await user.save();
      res.json({message: 'Account deactivated successfully'});
   } catch (err) {
      res.status(500).json({message: 'Error deactivating account', error: err.message});
   }
});

// Reactivating Account (Founder/Admin for Admin/Staff)
app.put('reactivate/:id', authMiddleware, async (req, res) => {
   try {
      const user = UserModel.findById(req.params.id);
      if (!user) return res.status(404).json({message: 'User not found'})
      if ((req.user.role === 'admin' && user.role !== 'staff') || req.user.role === 'staff') {
         return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
      }
      user.isActive = true;
      await user.save();
    res.status(201).json({ message: 'Account reactivated successfully' });
   } catch (err) {
      res.status(500).json({ message: 'Error reactivating account', error: err.message });
   }
});

// Change Password (Logged In Users)
app.put('/change-password', authMiddleware, async (req, res) => {
   try {
     const { oldPassword, newPassword } = req.body;
     const user = await User.findById(req.user._id);
     if (!user || !await bcrypt.compare(oldPassword, user.password)) {
       return res.status(400).json({ message: 'Old password is incorrect' });
     }
     user.password = newPassword;
     await user.save();
     res.json({ message: 'Password changed successfully' });
   } catch (err) {
     res.status(500).json({ message: 'Error changing password', error: err.message });
   }
 });

//STOCK APIS
 app.post('/incomingstock', async (req, res) => {
   console.log('Incoming stock request body:', req.body);
   try {
       const stock = await stockModel.create(req.body);
       res.status(201).json(stock);
   } catch (err) {
      console.error('Error creating incoming stock:', err.message);
       res.status(400).json({ error: err.message });
   }
});

app.post('/realtime-stock', async (req, res) => {
   console.log('Realtime stock request body:', req.body);
   try {
       const realStock = await RealTimeStockModel.create(req.body);
       res.status(201).json(realStock);
   } catch (err) {
      console.error('Error creating realtime stock:', err.message);
       res.status(400).json({ error: err.message });
   }
});

app.get('/incomingstock', async (req,res) => {
   try {
      const stock = await stockModel.find().sort({ date: -1 });;
      res.status(200).json(stock);
   } catch (err) {
      res.status(500).json({ message: 'error occurred getting incoming stock', error: err });
   }
 })

app.get('/realtime-stock', async (req,res) => {
   try {
      const realTimeStock = await RealTimeStockModel.find().sort({ date: -1 });;
      res.status(200).json(realTimeStock);
   } catch (err) {
      res.status(500).json({ message: 'error occurred displaying realtime', error: err });
   }
 })

 app.get('/final-realtime-stock', async (req,res) => {
   try {
      const realTimeStock = await RealTimeStockModel.find({ status: { $ne: 'Pending' } }).sort({ date: -1 });;
      res.status(200).json(realTimeStock);
   } catch (err) {
      res.status(500).json({ message: 'error occurred displaying realtime', error: err });
   }
 })

 app.get('/realstock/:itemName/:quantity', async (req, res) => {
   const {itemName, quantity} = req.params;
 
   try {
     const stockItem = await RealTimeStockModel.findOne({ itemName, quantity });
 
     if (!stockItem) {
       return res.status(404).json({ message: `Stock item ${itemName} with quantity ${quantity} not found` });
     }
 
     res.json(stockItem); // Return the found stock item as JSON response
   } catch (err) {
     console.error('Error fetching stock:', err);
     res.status(500).json({ message: 'Internal server error' });
   }
 });

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

app.put('/realtime-stock/approve/:id', (req, res) => {
   RealTimeStockModel.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true })
       .then(stock => res.json(stock))
       .catch(err => res.status(400).json({ error: err.message }));
});
 
app.delete('/realtime-stock/:id', (req, res) => {
   RealTimeStockModel.findByIdAndDelete(req.params.id)
       .then(() => res.json({ message: 'stock deleted' }))
       .catch(err => res.status(400).json({ error: err.message }));
});

app.delete('/realtime-finished-stock/:id', (req, res) => {
   RealTimeStockModel.findByIdAndDelete(req.params.id)
       .then(() => res.json({ message: 'stock deleted' }))
       .catch(err => res.status(400).json({ error: err.message }));
});

//REAL-TIME-STOCK APIs
// app.post('/add-stock', async (req,res) => {
//    try{
//       const newStock = await stockModel.create(req.body);
//       await RealTimeStockModel.create(req.body)
//    }
// })

//SALE APIs
app.post('/sale', async (req, res) => {
   const { itemName, quantity, pieces } = req.body;

  try {
   const stockItem = await RealTimeStockModel.findOne({itemName, quantity})

   if(!stockItem) {
      return res.status(404).json({message: 'Item not found in stock'})
   }
   if(stockItem.pieces<pieces) {
      return res.status(400).json({message: `Only ${stockItem.pieces} pieces of ${stockItem.quantity} ${stockItem.itemName} remaining in stock`})
   }


      const newSale = await SaleModel.create(req.body);

   stockItem.pieces -= pieces;
   await stockItem.save();

   res.status(201).json(newSale);
  } catch (err) {
   res.status(500).json({message: 'error on post /sale api', error: err});
  }
});

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


app.delete('/sale/delete/:id', async (req, res) => {
   const { id } = req.params;

   try {
      const deletedSale = await SaleModel.findByIdAndDelete(id);

      if (!deletedSale) {
         return res.status(404).json({ message: 'Sale not found' });
       }
       //updating realtime stock model
       const { itemName, pieces } = deletedSale;
    const stockItem = await RealTimeStockModel.findOne({ itemName: deletedSale.itemName, quantity: deletedSale.quantity });

    if (stockItem) {
      stockItem.pieces += pieces;
      await stockItem.save();
    }
    res.json({ message: 'Sale deleted and stock updated'  });

   }  catch (err) {
      console.error('Error deleting sale:', err);
    res.status(500).json({ message: 'Internal server error' });
   }    
});

// const itemsToRemove = await RealTimeStockModel.find({ pieces: { $lt: 1 } });

// Route to clean up stock items with pieces less than 1
app.delete('/realtime-stock/cleanup', async (req, res) => {
   
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

