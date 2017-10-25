const uuid = require('uuid/v4')

const accts = [{
  id: 101,
  name: `Melinda`,
  bankName: `Lots-o-money Bank`,
  description: `spending acct`,
  trans: [{
    transId: 50,
    title: `Oldwill`,
    amount: 735.01,
    pending: true
  }]
}]

function getAll(limit) {
  return limit ? accts.slice(0, limit) : accts
}

function getAllTrans(id) {
  // const id = Number(req.params.id)
  // const acct = accts.find(acct => acct.id === id)
  //
  // return acct.trans

  return limit ? acct.trans.slice(0, limit) : trans
}

function getOne(id) {
  const acct = accts.find(acct => acct.id === id)
  if (!acct) return 'error'
  return acct
}


function create(body) {
  const errors = []
  const {
    name,
    bankName,
    description
  } = body

  // const id = Number(req.params.id)
  // const acct = accts.find(acct => acct.id === id)
  // const transId = Number(req.params.transId)
  // const tran = acct.trans.find(tran => tran.id === transId)
  let response
  if (!name || !bankName || !description) {
    errors.push(`Field name, bankName and description are required`)
    response = {
      errors
    }
  } else {
    const id = uuid()
    const acct = {
      id,
      name,
      bankName,
      description
    }
    accts.push(acct)
    response = acct
  }
  return response
}

function update(id, body) {
  const errors = []
  const {
    name,
    bankName,
    description
  } = body
  const acct = accts.find(acct => acct.id === id)
  let response
  if (!acct) {
    errors.push(`Could not find acct with id of ${id}`)
    response = {
      errors
    }
  } else if (!name || !bankName || !description) {
    errors.push(`Field name, bankName, and description are required`)
    response = {
      errors
    }
  } else {
    acct.name = name
    acct.bankName = bankName
    acct.description = description

    response = acct
  }
  return response
}

function destroy(id) {
  const errors = []
  const acct = accts.find(acct => acct.id === id)
  let response

  if (!acct) {
    errors.push(`Could not find acct with id of ${id}`)
    response = {
      errors
    }
  } else {
    const index = accts.indexOf(acct)
    accts.splice(index, 1)
    response = ''
  }
  return response
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy,
  getAllTrans
}
