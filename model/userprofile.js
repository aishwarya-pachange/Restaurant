let userItemList=[];
let userItemModel = require('../model/userItem');


let userProfile=function (userID) {

    let userProfileModel={
        userID:userID,
        userItems:userItemList
    };

    return userProfileModel;
};

module.exports.getUserItems=function(){
    return userItemList;
}

module.exports.addUserItem=function(itemCode,catalogCategory,itemName,Rating,Ordered){

  userItemModel=require('../model/useritem');
   userItemModel=userItemModel.useritem(itemCode,catalogCategory,itemName,Rating,Ordered);

   let flag=0;

   for(let i=0;i<userItemList.length;i++)
   {
       if(userItemList[i].itemCode==itemCode) {
          flag=1;
       }
   }

   if (flag==0){
       userItemList.push(userItemModel);
   }
}

module.exports.deleteUserItem=function(itemCode){

    for(let i=0;i<userItemList.length;i++)
    {
        if(userItemList[i].itemCode==itemCode) {
            userItemList.splice(i,1);
        }
    }
}

module.exports.updateUserItem=function(itemCode,rating,Ordered,flag){
    for(let i=0;i<userItemList.length;i++)
    {
        if(userItemList[i].itemCode==itemCode)
        {

          console.log('Its in');
            if(flag==0)
            {
                if(userItemList[i].Ordered!=Ordered) {
                    userItemList[i].Ordered = Ordered;
                }
            }
            if(flag==1) {
                if (userItemList[i].Rating != rating) {
                  console.log('inside rating is'+userItemList[i].Rating);
                    userItemList[i].Rating = rating;
                }
            }


        }
    }

}



module.exports.userProfile=userProfile;
