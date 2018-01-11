
/*const Crawler = require("crawler");
const fs = require('fs');
const jsdom = require('jsdom')
const { JSDOM } = jsdom;
const c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
        }
        done();
    }
});
let followers = '',followersP = 0, following = '' ,followingP = 0;

c.queue([{
    uri: 'https://www.zhihu.com/people/excited-vczh/activities',
    jQuery: false,
 
    // The global callback won't be called
    callback: function (error, res, done) {
        if(error){
            console.log(error);
            done();
        }else{
            try{
                let doc = (new JSDOM(res.body)).window.document;
                let NumberBoard = doc.querySelectorAll('.NumberBoard .NumberBoard-item');
                NumberBoard.forEach(ele=>{
                    if(ele.getAttribute('href').match(/following/)){
                        following = ele.querySelector('.NumberBoard-itemValue').innerHTML.replace(/[^\d]/,'');
                        followingP = Math.ceil(following/20)
                    }
                    if(ele.getAttribute('href').match(/followers/)){
                        followers = ele.querySelector('.NumberBoard-itemValue').innerHTML.replace(/[^\d]/,'');
                        followersP = Math.ceil(followers/20)
                    }
                })
                console.log("关注了",following,"共有",followingP,"页");
                console.log("关注者",followers,"共有",followersP,"页");
                let i = 1;
                let followersArr = [];
                while( i<= followersP){
                    c.queue([{
                        uri: 'https://www.zhihu.com/people/excited-vczh/followers?page='+i,
                        jQuery: false,                     
                        // The global callback won't be called
                        callback: function (error, res, done) {
                            let doc = (new JSDOM(res.body)).window.document;
                            let list = doc.querySelectorAll('.List .List-item');

                            list.forEach(ele=>{
                                let img = ele.querySelector('.ContentItem-image .UserLink-link img').getAttribute('src');
                                let imgb = ele.querySelector('.ContentItem-image .UserLink-link img').getAttribute('srcset');
                                let nick = ele.querySelector('.UserItem-title .UserLink-link').innerHTML;
                                let nickLink = ele.querySelector('.UserItem-title .UserLink-link').getAttribute('href').replace(/(\/people\/)/,'');
                                followersArr.push({
                                    "img":img,
                                    "imgb":imgb,
                                    "nick":nick,
                                    "nickLink":nickLink
                                })
                            })
                            if(i%100 == 0){
                                console.log( '已完成 '+ (i/followersP)*100 + '%')
                            }
                            i >= followersP && fs.writeFile('./result.json', JSON.stringify(followersArr), function (err) {
                                if (err) throw err;
                                console.log('has finished');
                            });
                            
                            done();
                        }
                    }])
                    i++                    
                }


                
            }catch(e){
                console.log(e)
            }
            
            // console.log('Grabbed', (new JSDOM(res.body)).window.document.querySelector('#ProfileHeader').getAttribute('class'), 'bytes');
        }
       
    }
}]);*/
const fs = require('fs');
fs.readFile('./result.json', function (err,data) {
    let json = JSON.parse(data);
    
    if (err) throw err;
    console.log(json.length)
    // console.log( (p/followersP).toFixed(4) + ' has finished');
});