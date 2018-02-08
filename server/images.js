const path = require('path')
const Router = require('koa-router')
const fsAsync = require('async-file')

const userImagesPath = path.join(__dirname, `../static/user-images/`)

const router = Router({
  prefix: '/api'
})

function getImagesDir (ctx, subPath) {
  const userEmail = ctx.state.user.email

  return path.join(userImagesPath, userEmail, subPath)
}

router.get('/images', async ctx => {
  const subPath = ctx.query.subpath || ''
  const imagesDir = getImagesDir(ctx, subPath)
  const filesList = await fsAsync.readdir(imagesDir)

  ctx.body = await Promise.all(filesList.map(async file => {
    const stats = await fsAsync.stat(path.join(imagesDir, file))

    return {
      name: file,
      type: stats.isDirectory() ? 'dir' : 'file'
    }
  }))
})

router.post('/images-upload', async ctx => {
  const body = ctx.request.body

  if (!body.files || !body.files.image) {
    ctx.status = 403
    ctx.body = 'Wrong or corrupted file'
    return
  }

  const subPath = decodeURIComponent((body.fields && body.fields.subpath) || '')
  const imagesDir = getImagesDir(ctx, subPath)
  const imageFile = body.files.image

  try {
    const tempFilePath = decodeURIComponent(imageFile.path)
    const fileName = decodeURIComponent(imageFile.name)
    const newFilePath = path.join(imagesDir, fileName)

    await fsAsync.stat(tempFilePath)
      .then(() => fsAsync.rename(tempFilePath, newFilePath))

    ctx.body = {
      success: true,
      subPath,
      fileName: fileName
    }
  } catch (err) {
    ctx.status = 400

    console.error(err)
    ctx.body = err.toString()
  }
})

module.exports = router
