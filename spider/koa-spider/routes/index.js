const router = require('koa-router')()
const fs = require('fs');
const Model = require('../models/index')
const app = require('../app')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/readjson', async (ctx, next) => {
  let status = '失败'; let res = [];
  await new Promise(function(resolve, reject) {
    fs.readFile('public/result.json', function (err,data) {
    
      if (err) reject(err);;
      res =  JSON.parse(data);      
      status = '成功'
      resolve(res);
    });     
  });
  let promises = res.map((ele) => Model.createData(ctx, next,ele));

  await Promise.all(promises);  
  
  ctx.body = {
    title: '读取json',
    status : status
  }
  await ctx.render('home', ctx.body);
})

module.exports = router
