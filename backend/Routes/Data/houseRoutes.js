const router = require('express').Router();
const House = require('../../dbconfig/models/House')
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
router.get('/admindata',async (req, res)=>{
    const retrievedData = await House.find().lean()
    console.log(retrievedData);
    res.json(retrievedData)
})

module.exports = router;