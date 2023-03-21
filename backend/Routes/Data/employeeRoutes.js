const router = require('express').Router();
const Employee = require('../../dbconfig/models/Employee')
const House = require('../../dbconfig/models/House');
// const jwt = require("jsonwebtoken");
// const UTILS = require('./utils');
/**
 * Handle Sign up
 */
router.get('/getallusers', async (req, res)=>{
  const allUsers = await Employee.find().lean();
  console.log(allUsers);
 res.json(allUsers);
});
router.post('/checkemployee', async (req, res) => {
   console.log(req.body)
 const createdUser = await Employee.create({
    "EmployeeName":req.body.name,
    "EmployeeNumber":req.body.number,
 });
//   req.session.signinSuccess = true;
  res.json({ 
    ...createdUser,
    status: 200 
});
});
/**
 * Handle log in 
 */
// router.post('/login', async (req, res) => {
//   const currentUser = await User.find({ email: req.body.email, pwd: req.body.password }).lean();
//   // send tokenized user credential to decode on the front end.
//   if (currentUser.length !== 0) {
//     const token = jwt.sign(currentUser[0], '124', { mutatePayload: true });
//     req.session.loginStatus = true;
//     res.send(
//       {
//         ...currentUser[0],
//         token: true,
//         authToken: token
//       });
//   } else {
//     req.session.loginStatus = false;
//     res.send({ token: false });
//   }
// });
/**
 * Edit User
 */
// 
module.exports = router;