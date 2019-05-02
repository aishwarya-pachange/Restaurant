var User = require('../model/user');

module.exports.getAllUsers = function (db) {
  return new Promise((resolve, reject)=>{
    db.find({})
      .then(data=>{
        resolve(data);
      }).catch(err=>{return reject(err);})
  })
};

module.exports.getUser = function (user_Id,db) {
  return new Promise((resolve, reject)=>{
    db.findOne({userID:user_Id})
      .then(data=>{
        resolve(data);
      }).catch(err=>{return reject(err);})
  })
};

module.exports.getCountofUsers = function(){
    return data.length;
};
