const Router = require('koa-router')
const { query } = require('./db')
const crypto = require('crypto')

function isSimpleUser (ctx) {
  return ctx.state.user.role === 'user'
}

function isAdmin (ctx) {
  return ctx.state.user.role === 'admin'
}

function isManager (ctx) {
  return ctx.state.user.role === 'manager'
}

function checkEditPermit (ctx) {
  if (isSimpleUser(ctx)) {
    ctx.status = 403
    ctx.body = 'Operation not permitted'
    return false
  }

  return true
}

async function checkPermit (ctx) {
  const id = ctx.params.id

  if (!checkEditPermit(ctx)) {
    return
  }

  try {
    const user = (await query(`SELECT id, email, name, role FROM users WHERE id=${id}`))[0]

    if (user) {
      if (user.role !== 'user' && isManager(ctx)) {
        ctx.status = 400
        ctx.body = 'Error: Manager cannot change admins and other managers'
        return
      }
    }

    return user
  } catch (err) {
    ctx.status = 400
    ctx.body = err.toString()
  }
}

async function getUserPassword (ctx) {
  const id = ctx.params.id
  const user = (await query(`SELECT password FROM users WHERE id=${id}`))[0]

  return user ? user.password : ''
}

const router = Router({
  prefix: '/api'
})

router.get('/users', async ctx => {
  const ADMIN_QUERY = 'SELECT id, email, name, role FROM users'
  const MANAGER_QUERY = 'SELECT id, email, name, role FROM users where role="user"'

  if (!checkEditPermit(ctx)) {
    return
  }

  ctx.body = await query(isAdmin(ctx) ? ADMIN_QUERY : MANAGER_QUERY)
})

router.get('/users/:id', async (ctx) => {
  const user = await checkPermit(ctx)

  if (user) {
    ctx.body = user
  }
})

router.post('/users', async (ctx) => {
  const body = ctx.request.body

  if (!checkEditPermit(ctx)) {
    return
  }

  if (body.role !== 'user' && isManager(ctx)) {
    ctx.status = 400
    ctx.body = 'Error: Manager cannot change admins and other managers'
    return
  }

  try {
    const hashPassword = crypto.createHash('md5').update(body.password).digest('hex')

    await query(`INSERT INTO users (name, email, password, role) 
      VALUES ("${body.name}", "${body.email}", "${hashPassword}", "${body.role}")`)

    ctx.body = (await query(`SELECT id, email, name, role FROM users 
      WHERE email="${body.email}"`))[0]
  } catch (err) {
    ctx.status = 400
    ctx.body = err.toString()
  }
})

router.put('/users/:id', async (ctx) => {
  const body = ctx.request.body

  if (!(await checkPermit(ctx))) {
    return
  }

  let password

  if (body.password) {
    password = crypto.createHash('md5').update(body.password).digest('hex')
  } else {
    password = await getUserPassword(ctx)
  }

  try {
    await query(`UPDATE users SET 
      email="${body.email}", 
      password="${password}", 
      name="${body.name}", 
      role="${body.role}"
      WHERE id=${body.id}`)

    const user = await checkPermit(ctx)

    if (user) {
      ctx.body = user
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = err.toString()
  }
})

router.delete('/users/:id', async (ctx) => {
  const id = ctx.params.id
  const userId = ctx.state.user.id

  const user = await checkPermit(ctx)

  if (!user) {
    return
  }

  if ((isAdmin(ctx) || isManager(ctx)) && userId === user.id) {
    ctx.status = 400
    ctx.body = 'Error: User cannot delete himself'
    return
  }

  try {
    ctx.body = await query(`DELETE FROM users WHERE id=${id}`)
  } catch (err) {
    ctx.status = 400
    ctx.body = err.toString()
  }
})

router.get('/simple-users', async ctx => {
  if (!checkEditPermit(ctx)) {
    return
  }

  ctx.body = await query('SELECT id, email, name FROM users WHERE role="user"')
})

module.exports = router
