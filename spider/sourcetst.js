
const Crawler = require("crawler");
const jsdom = require('jsdom')
const { JSDOM } = jsdom;
const fs = require('fs');
const c1= new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            let $ = res.$;
            console.log($('#data').attr('data-state'))
            let sliceIndex = 0;
            // let str = $('#data').attr('data-state').replace(/(null,?)/g,'')
            // console.log($('#data').attr('data-state'))
            // str = str.replace(/\\(?:")/g,'')
            // sliceIndex = str.indexOf('"questions"')
            // str = str.slice(0,sliceIndex-1) + '}}'
            // let json = JSON.parse(str).entities.users;
            // delete json['excited-vczh']
            // let arr = []
            // for(let key in json){
            //     json[key].avatarUrlTemplate = json[key].avatarUrlTemplate.replace(/_{size}/,'')
            //     arr.push(json[key])
            // }
            // fs.writeFile('./dataState.json', JSON.stringify(arr), function (err) {
            //     if (err) throw err;
            //     console.log( ' has finished');
            // });
        }
        done();
    }
});
c1.queue('https://www.zhihu.com/people/excited-vczh/followers?page=1');