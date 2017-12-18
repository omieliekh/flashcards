const Router = require('koa-router')
const { query } = require('./db')

const router = Router({
  prefix: '/api'
})

router.get('/slideshows', async ctx => {
  const user = ctx.state.user

  const SLIDESHOW_QUERY =
    `SELECT id, name FROM slideshows where user_id=${user.id}`

  ctx.body = await query(SLIDESHOW_QUERY).then(slideshows => {
    const promises = slideshows.map(slideshow => {
      const SLIDE_QUERY =
        `SELECT image_path 
        FROM slides 
        WHERE user_id=${user.id} and slideshow_id=${slideshow.id} limit 1`

      return query(SLIDE_QUERY).then(([slide]) => {
        slideshow.image_path = slide.image_path

        return slideshow
      })
    })

    return Promise.all(promises)
  })
})

router.get('/slideshows/:id', async (ctx) => {
  const user = ctx.state.user
  const id = ctx.params.id
  const SLIDESHOW_QUERY = `SELECT id, name FROM slideshows where user_id=${user.id} and id=${id}`

  const SLIDES_QUERY =
    `SELECT id, text, lang_code, image_path 
    FROM slides 
    WHERE user_id=${user.id} and slideshow_id=${id}`

  const LANG_QUERY =
    `SELECT lang_code 
    FROM slideshows_to_languages
    WHERE slideshow_id=${id}`

  const [slideshow, langs, slides] = await Promise.all([
    query(SLIDESHOW_QUERY)
      .then(([slideshow]) => slideshow),

    query(LANG_QUERY)
      .then(langs => langs.map(lang => lang.lang_code)),

    query(SLIDES_QUERY)
  ])

  slideshow.lang_codes = langs
  slideshow.slides = slides

  ctx.body = slideshow
})

module.exports = router
