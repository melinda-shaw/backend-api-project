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
}, {
  id: 102,
  name: `Brenda`,
  bankName: `The Bank`,
  description: `checking`,
  trans: [{
      transId: 25,
      title: `Anthro`,
      amount: 130.59,
      pending: false
    },
    {
      transId: 32,
      title: `xxx`,
      amount: 12.00,
      pending: false
    }
  ]
}]

function getAll(limit) {
  return limit ? accts.slice(0, limit) : accts
}

function getAllTrans(id) {
  const acct = accts.find(acct => acct.id === id)
  // console.log(acct);
  return acct.trans
}

function getOne(id) {
  const acct = accts.find(acct => acct.id === id)

  if (!acct) return 'error'
  return acct
}

function getOneTrans(id, transId) {
  const acct = accts.find(acct => acct.id === id)
  const tran = acct.trans.find(tran => tran.transId === transId)
  if (!acct) return 'error'
  return tran
}

function createTrans(id, body) {
  const acct = accts.find(acct => acct.id === id)
  const trans = []
  const errors = []
  const {
    title,
    amount,
    pending
  } = body

  let response
  if (!acct) {
    errors.push(`No acct with id ${id}`)
    response = {
      errors
    }
  } else if (!title || !amount || !pending) {
    errors.push(`Field title, amount and pending are required`)
    response = {
      errors
    }
  } else {
    const transId = uuid()
    const tran = {
      transId,
      title,
      amount,
      pending
    }
    acct.trans.push(tran.transId)
    response = tran
  }
  return response
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
  getAllTrans,
  getOneTrans,
  createTrans
}
