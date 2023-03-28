const router = require('express').Router();
const House = require('../../dbconfig/models/House')
const Employee = require('../../dbconfig/models/Employee')
// const jwt = require("jsonwebtoken");
// const UTILS = require('./utils');
/**
 * Handle Sign up
 */
router.get('/checkemployee',
    (req, res) => {
        console.log('in get of check emp')
        res.send('response from get');
    });
router.post('/addhouse', async (req, res) => {
    console.log(req.body)
    const addedHouse = await House.create(req.body)
    res.json({
        ...addedHouse,
        status: 200
    });
});

router.post('/deletehouse',async (req, res)=>{
    console.log(req.body);
    // await House.deleteOne({ _id: req.body.id })
    await House.findByIdAndDelete({ _id: req.body.id });
    const HouseData = await House.find().lean()
    const AllEmployee = await Employee.find().lean()
    res.json({HouseData,AllEmployee})
//    res.send(newHouse);
})
router.post('/deleteemployee',async (req, res)=>{
    console.log(req.body);
    // await House.deleteOne({ _id: req.body.id })
    await Employee.findByIdAndDelete({ _id: req.body.id });
    const HouseData = await House.find().lean()
    const AllEmployee = await Employee.find().lean()
    res.json({HouseData,AllEmployee})
//    res.send(newHouse);
})
router.get('/admindata',async (req, res)=>{
    const HouseData = await House.find().lean()
    const AllEmployee = await Employee.find().lean()
    res.json({HouseData,AllEmployee})
})

module.exports = router;