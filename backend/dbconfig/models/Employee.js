const { Schema, model } = require('mongoose');

 const EmployeeSchema = new Schema({
  EmployeeName: {
    type: String,
  },
  EmployeeNumber:{
    type: Number,
    unique: true
  },
  VideosViewed:[String]
});

const Employee = model('Employee', EmployeeSchema);
module.exports = Employee;

// module.exports = User;