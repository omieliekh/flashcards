const fs = require('fs')
const Koa = require('koa')
const bodyParser = require('koa-body')
const { encode, decode } = require('./escape-data')
const auth = require('./auth')
const users = require('./users')
const slideshows = require('./slideshows')


const DEBUG = process.env.NODE_ENV === 'dev'
const app = new Koa()

try {
  fs.mkdirSync('./.tmp/')
} catch (err) { }

// Set up body parsing middleware
app.use(bodyParser({
  formidable: {
    uploadDir: './uploads'
  },
  multipart: true,
  urlencoded: true
}))

app.use(async (ctx, next) => {
  if (ctx.params) {
    encode(ctx.params)
  }

  if (ctx.request.body) {
    encode(ctx.request.body)
  }

  await next()

  if (ctx.body && typeof ctx.body !== 'string') {
    decode(ctx.body)
    ctx.type = 'application/json'
  }
})

app.use(auth.routes())
app.use(users.routes())
app.use(slideshows.routes())

module.exports = app.listen(3000)
DEBUG && console.log('running on http://localhost:3000')
