
const Crawler = require("crawler");
const fs = require('fs');
const jsdom = require('jsdom')
const { JSDOM } = jsdom;
let followers = '',followersP = 0, following = '' ,followingP = 0;
let followersArr = [],followersURI =[];
const c1= new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            let $ = res.$;
            let NumberBoard = $('.NumberBoard .NumberBoard-item');
            let i = 1;
            NumberBoard.each(function(){
                if($(this).attr('href').match(/following/)){
                    following = $(this).find('.NumberBoard-itemValue').html().replace(/[^\d]/,'');
                    followingP = Math.ceil(following/20)
                }
                if($(this).attr('href').match(/followers/)){
                    followers = $(this).find('.NumberBoard-itemValue').html().replace(/[^\d]/,'');
                    followersP = Math.ceil(followers/20)
                }
            })
            console.log("关注了",following,"共有",followingP,"页");
            console.log("关注者",followers,"共有",followersP,"页");
            
            while( i<= followersP){
                followersURI.push('https://www.zhihu.com/people/excited-vczh/followers?page='+i)
                i++
            }
            cf.queue(followersURI);

        }
        done();
    }
});
let p = 0; 
const cf= new Crawler({
    rateLimit: 500,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{     
            try{
                p++
                let $ = res.$;
                let sliceIndex = 0;
                let str = $('#data').attr('data-state').replace(/(null,?)/g,'')
                str = str.replace(/\\(?:")/g,'')
                sliceIndex = str.indexOf('"questions"')
                str = str.slice(0,sliceIndex-1) + '}}'
                let json = JSON.parse(str).entities.users;
                delete json['excited-vczh']
                let arr = []
                for(let key in json){
                    json[key].avatarUrlTemplate = json[key].avatarUrlTemplate.replace(/_{size}/,'')
                    arr.push(json[key])
                }
                arr.forEach(ele=>{
                    followersArr.push({
                        "img":ele.avatarUrlTemplate,
                        "nick":ele.name,
                        "gender":ele.gender,
                        "nickLink":ele.urlToken
                    })
                })

                fs.writeFile('./result.json', JSON.stringify(followersArr), function (err) {
                    if (err) throw err;
                    console.log( (p*100/followersP).toFixed(4) + '% has finished');
                });
            }catch(e){
                console.log(p,e)
            }       
            
            
            
        }
        done();
    }
});
c1.queue('https://www.zhihu.com/people/excited-vczh/activities');

