var mongoose=require('mongoose');

var userItemSchema=new mongoose.Schema({
UserID:{type:String,required:true},
itemCode:{type:String,required:true},
itemName:String,
catalogCategory:String,
Rating:{type:Number,default:0},
Ordered:{type:Boolean,default:false}
},{collection:'Orders'});

module.exports=mongoose.model('userItemsModel',userItemSchema);


/*let useritem=function (itemCode,catalogCategory,itemName,Rating,Ordered) {

    let useritemModel={
        itemCode:itemCode,
        catalogCategory:catalogCategory,
        itemName:itemName,
        Rating:Rating,
        Ordered:Ordered,
    };

    return useritemModel;
};


module.exports.useritem=useritem;
*/
