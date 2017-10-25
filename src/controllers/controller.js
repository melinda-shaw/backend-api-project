const model = require('../models/model')

function getAll(req, res, next) {
  const limit = req.query.limit
  const data = model.getAll(limit)
  res.json({
    data
  })
}

function getAllTrans(req, res, next) {
  const limit = req.query.limit
  // console.log('limit s/b here', limit);
  const data = model.getAllTrans(limit)

  // const id = Number(req.params.id)
  // const acct = accts.find(acct => acct.id === id)
  // res.json({
  //   data: acct.trans
  // })

  res.json({
    data
  })
}

///// remove this
// app.getAllTrans('/accts/:id/trans', (req, res, next) => {
//   const id = Number(req.params.id)
//   const acct = accts.find(acct => acct.id === id)
//
//   res.json({
//     data: acct.trans
//   })
// })
///////

function getOne(req, res, next) {
  const id = req.params.id
  const result = model.getOne(id)

  if (result === 'error')
    return next({
      status: 404,
      message: `Could not find acct with id of ${id}`
    })

  res.json({
    data: result
  })
}

function create(req, res, next) {
  const result = model.create(req.body)
  if (result.errors) {
    return next({
      status: 400,
      message: `Could not create new acct`,
      errors: result.errors
    })
  }
  res.status(201).json({
    data: result
  })
}

function update(req, res, next) {
  const result = model.update(req.params.id, req.body)

  if (result.errors) {
    return next({
      status: 400,
      message: `Could not update acct`,
      errors: result.errors
    })
  }
  res.status(202).json({
    data: result
  })
}

function destroy(req, res, next) {
  const id = req.params.id
  const result = model.destroy(id)

  if (result.errors) {
    return next({
      status: 404,
      message: `Could not delete acct`,
      errors: result.errors
    })
  }
  res.status(204).json()
}



module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy,
  getAllTrans
}
