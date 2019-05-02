var Item = require('../model/item.js');

module.exports.getAllItems = function (db) {

  return new Promise((resolve,reject)=>{
          db.find({})
              .then(data => {
                  resolve(data);
              }).catch(err=>{return reject(err); })
      })
  };

  module.exports.getItem=function(code,db){
    return new Promise((resolve,reject)=>{
        db.findOne({itemCode:code})
            .then(data => {
                resolve(data);
            }).catch(err=>{return reject(err); })
    })
};

module.exports.getNumberOfItems = function (db){
    return db.find().count(function(err,count){

    });
};


/* var data = [
    {
        itemCode: 1,
        itemName: "Paneer Tikka Masala",
        catalogCategory: "Vegetarian",
        description: "Paneer Tikka Masala is a Indian dish marinated cottage cheese served with spicy gravy.",
        rating: 3,
        imgUrl: "/assests/images/paneer.jpg",

    },
    {
        itemCode: 2,
        itemName: "Dal Tadka",
        catalogCategory: "Vegetarian",
        description:"Dal tadka is a popular side item of Punjabi cuisine. Mouth watering in taste this item takes minutes to cook and is nutritious and appetising. Made of red and yellow lentils.The dal has a rustic flavour and is eaten with roti, naan, lachcha and jeera rice.",
        rating:4,
        imgUrl: "/assests/images/dal.jpg",
    },


    {
        itemCode: 3,
        itemName: "Shaahi Dal Makhani",
        catalogCategory: "Vegetarian",
        description: "Black lentils sautéed in butter, cooked with ginger, garlic, tomatoes, onion and garnished with ginger jullians." ,
        rating: 5,
        imgUrl: "/assests/images/makhani.jpg",
    },


    {
        itemCode: 4,
        itemName: "Chicken Tikka Masala",
        catalogCategory: "Non-Vegetarian",
        description:"Marinated pieces of boneless chicken breast, with green bell peppers and onion, cooked in creamy tomato base sauce with a hint of Indian herbs & spices, cooked to perfection.",
        rating: 4,
        imgUrl: "/assests/images/chicken.jpg",
    },

    {
        itemCode: 5,
        itemName: "Chicken Biryani",
        catalogCategory: "Non-Vegetarian",
        description: "Basmati rice cooked with boneless chicken, freshly ground spices, cashews and raisins, garnished with cilantro and almond slices.",
        rating: 3,
        imgUrl: "/assests/images/biryani.jpg",
    },

    {
        itemCode: 6,
        itemName: "Lamb Curry",
        catalogCategory: "Non-Vegetarian",
        description: "Boneless lamb cooked in tomato onion base sauce mixed with ginger, garlic and spices",
        rating: 3,
        imgUrl: "/assests/images/lamb.jpg",
    },

];

var category = ["Vegetarian", "Non Vegetarian"];
*/
