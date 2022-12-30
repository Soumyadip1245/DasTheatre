const router = require('express').Router()
const { response } = require('express');
const User = require('../models/user')
var ObjectId = require('mongoose').Types.ObjectId;
router.post('/register',(req,res)=>{
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type
    })
    user.save().then(()=>{
        res.json({message: "Account Created"})
    })
})
router.get('/login',(req,res)=>{
    User.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }
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
router.put('/edit/:id', (req, res) => {
    
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    var ser ={
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        type: req.body.type,
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
router.delete('/delete/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    User.findByIdAndRemove(req.params.id,(err,doc)=>{
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Deleted:' + JSON.stringify(err, undefined, 2)); }
    })
})
router.post('/additem', (req, res) => {
    var ser = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type
    });
    ser.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Save:' + JSON.stringify(err, undefined, 2)); }
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

module.exports = router