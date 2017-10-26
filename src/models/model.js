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

/////// trans // trans // trans //////

function getAllTrans(id) {
  const acct = accts.find(acct => acct.id === id)
  // console.log(acct);
  return acct.trans
}

function getOneTrans(id, transId) {
  const acct = accts.find(acct => acct.id === id)
  const tran = acct.trans.find(tran => tran.transId === transId)
  if (!acct) return 'error'
  return tran
}

function createTrans(id, body) {
  const acct = accts.find(acct => acct.id === id)
  // const trans = []
  const errors = []
  const {
    title,
    amount,
    pending
  } = body
  // const title = body.title

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
    acct.trans.push(tran)
    response = tran
  }
  return response
}

function updateTrans(id, transId, body) {
  const errors = []
  const acct = accts.find(acct => acct.id === id)
  const tran = acct.trans.find(tran => tran.transId === transId)
  const {
    title,
    amount,
    pending
  } = body
  console.log(body);
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
    const tran = {
      transId,
      title,
      amount,
      pending
    }
    console.log(tran);

    acct.trans.transId = transId
    acct.trans.title = title
    acct.trans.amount = amount
    acct.trans.pending = pending
    response = tran

    console.log(response);
  }
  return response
}

function destroyTrans(id, transId) {
  const errors = []

  // let data = fs.readFileSync('./acct.data.json', 'utf-8')
  // data = JSON.parse(data)
  let response

  const acct = accts.find(acct => acct.id === id)
  const tran = acct.trans.find(tran => tran.transId === transId)

  if (!acct) {
    errors.push(`Could not find acct with id of ${id}`)
    response = {
      errors
    }
  } else if (!tran) {
    errors.push(`Could not find trans with id of ${transId}`)
    response = {
      errors
    }
  } else {
    const index = acct.trans.indexOf(tran)
    acct.trans.splice(index, 1)
    // data = JSON.stringify(data)
    // fs.writeFileSync('./acct.data.json', data)
    response = tran

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
  createTrans,
  updateTrans,
  destroyTrans
}
