const path = require('path')
const Router = require('koa-router')
const fsAsync = require('async-file')

const userImagesPath = path.join(__dirname, `../static/user-images/`)

const router = Router({
  prefix: '/api'
})

router.get('/images', async ctx => {
  const userEmail = ctx.state.user.email
  const subpath = ctx.query.subpath || ''

  const dirPath = path.join(userImagesPath, userEmail, subpath)
  const list = await fsAsync.readdir(dirPath)

  ctx.body = await Promise.all(list.map(async file => {
    const stats = await fsAsync.stat(path.join(dirPath, file))

    return {
      name: file,
      type: stats.isDirectory() ? 'dir' : 'file'
    }
  }))
})

module.exports = router
