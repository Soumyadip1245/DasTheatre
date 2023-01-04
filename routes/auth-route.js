const router = require('express').Router()
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../models/user')
const loginAuth = require('./login')
var ObjectId = require('mongoose').Types.ObjectId;
router.post('/register',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
       
            const user = new User({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hash,
                type: req.body.type
            })
            user.save().then(()=>{
                res.json({success: true, message: "Account Created"})
            }).catch(err=>{
                res.json({success: false,message: "All Fields Are Required"})
            })
        
    })
   
})
router.post('/login',(req,res)=>{
   User.find({email: req.body.email}).exec().then((result)=>{
    if(result.length < 1){
        return res.json({message: "Email not filled or doesn't exist"})
    }
    else{
        const user = result[0]
        bcrypt.compare(req.body.password,user.password,(err,value)=>{
            if(value){
                const payload = {
                    userId: user._id
                }
                const token = jwt.sign(payload,"webBatch")
                return res.json({success: true, token: token, message: "Login Successfull"})
            }
            else{
                return res.json({success: false, message: "Credentials Not Matched For Details"})
            }
        })
    }
   }).catch((err)=>{
    return res.json({message: "Not done"})
   })

})
router.get('/profile', loginAuth, (req,res)=>{
    const Id = req.userData.userId
    User.findById(Id).exec().then((value)=>{
        res.json({success: true, data: value, message: "Login Successful"})
    }).catch((err)=>{
        res.json({success: false, message: "Server"})
    })
})
router.get('/admin',(req,res)=>{
    User.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }
    })
})
router.put('/update/:id', (req, res) => {
    
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    var ser ={
        authorised: req.body.authorised
    };
    User.findByIdAndUpdate(req.params.id, { $set: ser }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update:' + JSON.stringify(err, undefined, 2)); }
    })
})
router.get('/toggle/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Service: ' + JSON.stringify(err, undefined, 2)); }
    })

})
router.get('/sort', async (req,res)=>{
    let data = await User.find(
        {
            "$or": [
                {authorised: true}
            ]
        }
    )
    res.send(data)
})
router.get('/forget/:email', async (req,res)=>{
    let data = await User.find(
        {
            "$or": [
                {email: req.params.email}
            ]
        }
    )
    res.send(data)
})
router.post('/postData',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        const user = new User({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: hash,
            type: req.body.type
        })
        user.save().then(()=>{
            res.json({success:true, message: "Data Added"})
    
        }).catch((err)=>{
            res.json({success:false,message: "All Field Are Needed"})
        })
    })
    
})
router.delete('/deleteUser/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.json({success: true, message: "User Deleted"})
        }
        else{
            res.json({success: false, message: "Something Wrong"})
        }
    })
})
router.put('/editUser/:id',(req,res)=>{
    var ser = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        type: req.body.type,
    }
    User.findByIdAndUpdate(req.params.id,{$set: ser} ,(err,doc)=>{
        if(err){
            res.json({success:false, message: "Data Cannot Be edited"})
        }
        else{
            res.json({success:true, message: "User Edited"})
        }
    })
})
router.post('/forgetemail',(req,res)=>{
    User.findById(req.body.id,(err,doc)=>{
        if(!doc){
            res.json({success:false, message: "User Not Found Try Again"})
        }
        else{
            res.json({success:true, message: "User Found",value: doc})
        }
    })
})
router.put('/editPassword/:id',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        var ser = {
            password: hash
        }
        User.findByIdAndUpdate(req.params.id,{$set: ser} ,(err,doc)=>{
            if(err){
                res.json({success:false, message: "Password Cannot Be Changed"})
            }
            else{
                res.json({success:true, message: "Password Changed"})
            }
        })
    })
    
})
module.exports = router