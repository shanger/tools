const FriendLink = require('./model/Followers.js');

module.exports.createData = async function(ctx,next,data){
    try{
        await FriendLink.create(data);
    }catch(e){
        console.log(e);
    }
    return true;

} 