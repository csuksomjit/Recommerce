var mongoose = require('mongoose');
var Rule = require('../models/rules');
var Item = require('../models/item');
var User = require('../models/user');

var list = function(user_id){
	return new Promise(function(resolve,reject){
		User.findById(user_id,function(err,obj){
	    if(err)console.log(err);
	    user = obj;
	    userBuys = obj.buys;
	    list= [];
	    userBuys.forEach( function(element, index) {
	        // statements
	        list.push(mongoose.Types.ObjectId(element._id));

	    });
	    result = getItem(list,"rules");
	    result.then(function(res){
	        itemRes = getItem(res,"item_res");
	        itemRes.then(function(result){
	           item_res = result;
	           Item.find({}).where('count').eq(1).exec(function(err,obj){
	            if(err)console.log(err);
	            item_longtail = obj;
	            list=[user,item_res,item_longtail];
	            resolve(list);
	            
	           })
	        })
	    })
	   

	    })
	})
	
}

function getItem(list,option){
    return new Promise(
        function(resolve,reject){
            if(option=="rules"){
               Rule.find({},function(err,obj){
                if(err)console.log(err);
                array = [];
                obj.forEach( function(element1, index1) {
                    // statements
                    list.forEach( function(element2, index2) {
                        // statements
                        id1 =element2
                        id2 =element1.r1;
                        if(id1.equals(id2)){
                            array.push(element1.r2);
                        }
                    });
                    
                });
                resolve(array);
                }) 
            }
            else if(option=="item_res"){
                Item.find({},function(err,obj){
                if(err)console.log(err);
                array = [];
                obj.forEach( function(element1, index1) {
                    // statements
                    list.forEach( function(element2, index2) {
                        // statements
                        id1 =element2
                        id2 =element1._id;
                        if(id1.equals(id2)){
                            array.push(element1);
                        }
                    });
                    
                });
                resolve(array);
                }) 
            }
            
        }
    );
    
}

module.exports = list;
// console.log(list[0]);
// console.log(list[1]);
// console.log(list[2]);