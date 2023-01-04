const router = require('express').Router()
const Movies = require('../models/movies')
const Seats = require('../models/seats')
const Booking = require('../models/booking')
const nodemailer = require('nodemailer')

var ObjectId = require('mongoose').Types.ObjectId;
router.get('/movies',(req,res)=>{
    Movies.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }
    })
})
router.put('/update/:id', (req, res) => {
    
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    var ser ={
        buyout: req.body.buyout
    };
    Movies.findByIdAndUpdate(req.params.id, { $set: ser }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update:' + JSON.stringify(err, undefined, 2)); }
    })
})
router.put('/updateCheckout/:id', (req, res) => {
    
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    var ser ={
        checkout: req.body.checkout
    };
    Movies.findByIdAndUpdate(req.params.id, { $set: ser }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update:' + JSON.stringify(err, undefined, 2)); }
    })
})
router.put('/edit/:id', (req, res) => {

    var ser ={
        name: req.body.name,
        image: req.body.image,
        age: req.body.age,
        release: req.body.release,
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description
    };
    Movies.findByIdAndUpdate(req.params.id, { $set: ser }, { new: true }, (err, doc) => {
        if(err){
            res.json({success:false, message: "All Field Are Required"})
        }
        else{
            res.json({success:true,message: "Movie Updated"})
        }
    })
})
router.get('/toggle/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Movies.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Service: ' + JSON.stringify(err, undefined, 2)); }
    })

})
router.get('/viewMovie/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Movies.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Service: ' + JSON.stringify(err, undefined, 2)); }
    })

})
router.delete('/delete/:id',(req,res)=>{
    Movies.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(err){
            res.json({success:false, message: "Select A Movie First"})
        }
        else{
            res.json({success:true,message: "Movie Deleted"})
        }
    })
})
router.post('/addmovies', (req, res) => {
    var ser = new Movies({
        name: req.body.name,
        image: req.body.image,
        age: req.body.age,
        release: req.body.release,
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description
    });
    ser.save((err, doc) => {
       if(err){
        res.json({success:false,message: "All Field Are Needed"})
       }
       else{
        res.json({success:true, message: "Movies Added"})
       }
    })
})
router.get('/sort', async (req,res)=>{
    let data = await Movies.find(
        {
            "$or": [
                {buyout: true}
            ]
        }
    )
    res.send(data)
})
router.get('/checkout', async (req,res)=>{
    let data = await Movies.find(
        {
            "$or": [
                {checkout: true}
            ]
        }
    )
    res.send(data)
})
router.get('/normal', async (req,res)=>{
    let data = await Seats.find(
        {
            "$or": [
                {type: "normal"},{type: "super"}
            ]
        }
    )
    res.send(data)
})
router.get('/premium', async (req,res)=>{
    let data = await Seats.find(
        {
            "$or": [
                {type: "premium"}
            ]
        }
    )
    res.send(data)
})
router.get('/super', async (req,res)=>{
    let data = await Seats.find(
        {
            "$or": [
                {type: "super"}
            ]
        }
    )
    res.send(data)
})
router.put('/updateAvailable/:id', (req, res) => {
    
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    var ser ={
        available: req.body.available
    };
    Seats.findByIdAndUpdate(req.params.id, { $set: ser }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update:' + JSON.stringify(err, undefined, 2)); }
    })
})
router.get('/seat/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Seats.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Service: ' + JSON.stringify(err, undefined, 2)); }
    })

})
router.get('/premium', async (req,res)=>{
    let data = await Seats.find(
        {
            "$or": [
                {type: "premium"}
            ]
        }
    )
    res.send(data)
})
router.post('/addDetails', (req, res) => {
    var ser = new Booking({
        name: req.body.name,
        movie: req.body.movie,
        contact: req.body.contact,
        email: req.body.email,
        payment: req.body.payment,
        seat: req.body.seat,
        total: req.body.total,
        order: req.body.order
    });
    ser.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Save:' + JSON.stringify(err, undefined, 2)); }
    })
})
router.get('/details',(req,res)=>{
    Booking.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }
    })
})
router.get('/searchbar/:key', async (req,res)=>{
    let data = await Booking.find(
        {
            "$or": [
                {name: req.params.key}
            ]
        }
    )
    res.send(data)
})
router.post('/sendmails', async(req,res,next)=>{
    var ob = {
        name: req.body.name,
        movie: req.body.movie,
        contact: req.body.contact,
        email: req.body.email,
        payment: req.body.payment,
        seat: req.body.seat,
        total: req.body.total,
        order: req.body.order
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "bahubalicantlive@gmail.com",
            pass: "hpogdeygcwiibhak",
        },
        secure: true,
    });
    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
    const mailData = {
        from : 'bahubalicantlive@gmail.com',
        to: ob.email,
        subject: `Ticked For The Order Id: ${ob.order}`,
       html: `<!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta http-equiv="X-UA-Compatible" content="IE=edge">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Document</title>
           <style>
               .invoice-box {
                   max-width: 800px;
                   margin: auto;
                   padding: 30px;
                   border: 1px solid #eee;
                   box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                   font-size: 16px;
                   line-height: 24px;
                   font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                   color: #555;
               }
       
               .invoice-box table {
                   width: 100%;
                   line-height: inherit;
                   text-align: left;
               }
       
               .invoice-box table td {
                   padding: 5px;
                   vertical-align: top;
               }
       
               .invoice-box table tr td:nth-child(2) {
                   text-align: right;
               }
       
               .invoice-box table tr.top table td {
                   padding-bottom: 20px;
               }
       
               .invoice-box table tr.top table td.title {
                   font-size: 45px;
                   line-height: 45px;
                   color: #333;
               }
       
               .invoice-box table tr.information table td {
                   padding-bottom: 40px;
               }
       
               .invoice-box table tr.heading td {
                   background: #eee;
                   border-bottom: 1px solid #ddd;
                   font-weight: bold;
               }
       
               .invoice-box table tr.details td {
                   padding-bottom: 20px;
               }
       
               .invoice-box table tr.item td {
                   border-bottom: 1px solid #eee;
               }
       
               .invoice-box table tr.item.last td {
                   border-bottom: none;
               }
       
               .invoice-box table tr.total td:nth-child(2) {
                   border-top: 2px solid #eee;
                   font-weight: bold;
               }
       
               @media only screen and (max-width: 600px) {
                   .invoice-box table tr.top table td {
                       width: 100%;
                       display: block;
                       text-align: center;
                       font-size: 80%
                   }
       
                   .invoice-box table tr.information table td {
                       width: 100%;
                       display: block;
                       text-align: center;
                   }
       tr.information td{
                   
                   text-align: center;
                   font-size: 80%;
       
               }
               tr.heading{
                   font-size: 70%;
               }
               tr.details td{
                   font-size: 70%;
               }
               tr.item td{
                   font-size: 70%;
               }
               tr.total td{
                   font-size: 70%;
               }
               }
       
               /** RTL **/
               .invoice-box.rtl {
                   direction: rtl;
                   font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
               }
       
               .invoice-box.rtl table {
                   text-align: right;
               }
       
               .invoice-box.rtl table tr td:nth-child(2) {
                   text-align: left;
               }
           </style>
       </head>
       <body>
           <div class="invoice-box">
           <table cellpadding="0" cellspacing="0">
               <tr class="top" >
                   <td colspan="2">
                       <table>
                           <tr>
                               <td class="title">
                                   <img src="https://i.imgur.com/0rjUN5f.png" style="width: 100%; max-width: 300px" />
                               </td>
       
                               <td>
                                   Order: ${ob.order}<br />
                                   Name: ${ob.name}<br />
                                   Email: ${ob.email}
                               </td>
                           </tr>
                       </table>
                   </td>
               </tr>
               <tr class="heading">
                   <td>Payment Method</td>
       
                   <td>Total</td>
               </tr>
       
               <tr class="details">
                   <td>${ob.payment}</td>
       
                   <td>₹ ${ob.total}</td>
               </tr>
       
               <tr class="heading">
                   <td>Movie</td>
       
                   <td>Seat</td>
               </tr>
       
               <tr class="item">
                   <td>${ob.movie}</td>
       
                   <td>${ob.seat}</td>
               </tr>
       
               <tr class="total">
                   <td></td>
                   <td><b>Total: ₹ ${ob.total}</b></td>
               </tr>
           </table>
       </div>
       </body>
       </html>`
    };
    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
    
    res.status(200).json({ status: "OK" });
    
}
)  

module.exports = router
