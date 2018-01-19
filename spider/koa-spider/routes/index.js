const router = require('koa-router')()
const fs = require('fs');
const Model = require('../models/index')
const app = require('../app')

router.get('/', async (ctx, next) => {
  let content = {
    title: 'Hello Koa 2!'
  }
  await ctx.render('home', content);
})

router.get('/string', async (ctx, next) => {
  let content  = { 
    title: 'Hello Koa 2!'
  }
  // ctx.set('Content-Type', 'text/html');
  try{
    console.log(ctx.response)
  }catch(e){
    console.log(e)
  }
  
  await ctx.render('home', content);
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/readjson', async (ctx, next) => {
  let status = '失败'; let res = [];
  // await new Promise(function(resolve, reject) {
  //   fs.readFile('public/result.json', function (err,data) {
    
  //     if (err) reject(err);;
  //     res =  JSON.parse(data);      
  //     status = '成功'
  //     resolve(res);
  //   });     
  // });
  res = [
    {
      "img":"ele.avatarUrlTemplate",
      "nick":"ele.name",
      "gender":"ele.gender",
      "nickLink":"ele.urlToken"
    },{
      "img":"ele.avatarUrlTemplate",
      "nick":"ele.name",
      "gender":"ele.gender",
      "nickLink":"ele.urlToken"
    },{
      "img":"ele.avatarUrlTemplate",
      "nick":"ele.name",
      "gender":"ele.gender",
      "nickLink":"ele.urlToken"
    },{
      "img":"ele.avatarUrlTemplate",
      "nick":"ele.name",
      "gender":"ele.gender",
      "nickLink":"ele.urlToken"
    }
    
  ]
  // let promises = res.map((ele) => Model.createData(ctx, next,ele));
  // await Promise.all(promises);
  try{
    await  Model.createData(ctx, next,res)
    status = '成功'
  }catch(e){
    status = '失败'
  }
  
  ctx.body = {
    title: '读取json',
    status : status
  }
  await ctx.render('home', ctx.body);
})

module.exports = router
