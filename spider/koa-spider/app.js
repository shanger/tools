const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const hbs = require('koa-hbs')
const convert = require('koa-convert');
const router = require('koa-router')()

const index = require('./routes/index')
const users = require('./routes/users')
const sq = require('./utils/sequelize');


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(hbs.middleware({
  viewPath: __dirname + '/views',
  defaultLayout: 'layout',
  // partialsPath: __dirname + '/views/partials'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
router.use(index.routes()).use(index.allowedMethods());
app.use(index.routes(), index.allowedMethods())
router.use(users.routes()).use(users.allowedMethods());
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
