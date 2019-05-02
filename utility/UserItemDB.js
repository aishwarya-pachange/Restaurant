var userItemsModel=require('../model/userItem');


module.exports.addUserItem=function(itemCode,userID,catalogCategory,itemName){
  return new Promise((resolve,reject)=>{
    userItemsModel.findOneAndUpdate({$and:[{UserID:userID},{itemCode:itemCode}]},
      {$set:{UserID:userID,itemCode:itemCode, catalogCategory:catalogCategory,itemName:itemName,Rating:0,Ordered:false}},
      {upsert:true},function(err,data){
        resolve(data);
      }).catch(err=>{return reject(err);});

});
}
  module.exports.getUserItems=function(userID){
    return new Promise((resolve,reject)=>{
      userItemsModel.find({UserID:userID})
        .then(data => {
          resolve(data);
        }).catch(err=>{return reject(err); })
      });
    }


module.exports.deleteUserItem=function(item_param){
      return new Promise((resolve,reject)=>{
        userItemsModel.deleteOne({itemCode:item_param})
          .then(data => {
            resolve(data);
          }).catch(err=>{return reject(err); })
        });
      }



module.exports.addItemRating=function(itemCode,userID,rating){
return new Promise((resolve,reject)=>{
  userItemsModel.findOneAndUpdate({$and:[{UserID:userID},{itemCode:itemCode}]},
    {$set:{UserID:userID,itemCode:itemCode,Rating:rating}},
    {new:true,upsert:true},function(err,data){
      //console.log(data);
      resolve(data);
    }).catch(err=>{return reject(err);});

});
}


module.exports.OrderedIt=function(itemCode,userID,ordered){
return new Promise((resolve,reject)=>{
userItemsModel.findOneAndUpdate({$and:[{UserID:userID},{itemCode:itemCode}]},
{$set:{UserID:userID,itemCode:itemCode,Ordered:ordered}},
{new:true,upsert:true},function(err,data){
//console.log(data);
resolve(data);
}).catch(err=>{return reject(err);});
});
}
