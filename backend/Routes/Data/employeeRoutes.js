const router = require('express').Router();
const Employee = require('../../dbconfig/models/Employee')
const House = require('../../dbconfig/models/House');
// const jwt = require("jsonwebtoken");
// const UTILS = require('./utils');
/**
 * Handle Sign up
 */

router.get('/dropallemployees',async(req,res)=>{
  try{
    const dropEmployees = await Employee.collection.drop();
    console.log(dropEmployees);
    res.send('employees dropped')
  }catch(error){
    console.log(error);
    res.send('oops')
  }
})


router.get('/getallusers', async (req, res)=>{
  const allUsers = await Employee.find().lean();
  console.log(allUsers);
  res.json(allUsers);
});

router.post('/addwatchedvideo',async(req,res)=>{
  const empToEdit = await Employee.findOne({EmployeeName:req.body.emp})
  const videoToAdd = req.body.video;
  const updated = await Employee.findOneAndUpdate({EmployeeName:req.body.emp},{$push:{'VideosViewed':videoToAdd}})

})

router.post('/checkemployee', async (req, res) => {
  try{
    const findEmp = await Employee.findOne({'EmployeeNumber':req.body.number})
    console.log(findEmp);
    if(!findEmp){

      const createdUser = await Employee.create({
          "EmployeeName":req.body.name,
          "EmployeeNumber":req.body.number,
        });
         console.log(await createdUser.validate());
          req.session.signinSuccess = true;
        res.json({ 
          ...createdUser,
          status:200 
        });
      }else{
      res.json({
        ...findEmp,
        status:200
      })
      }
  }catch(e){
    res.send({error:'user already exists'})
  }
  });

module.exports = router;