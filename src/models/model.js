const fs = require('fs')
const uuid = require('uuid/v4')

function getAll(limit) {
  let data = fs.readFileSync('./accts.data.json', 'utf-8')
  data = JSON.parse(data)

  return limit ? data.accts.slice(0, limit) : data.accts
}

function getOne(id) {
  let data = fs.readFileSync('./accts.data.json', 'utf-8')
  data = JSON.parse(data)
  const acct = data.accts.find(acct => acct.id === id)
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

  let data = fs.readFileSync('./accts.data.json', 'utf-8')
  data = JSON.parse(data)

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
    data.accts.push(acct)
    response = acct
    data = JSON.stringify(data)
    fs.writeFileSync('./accts.data.json', data)

  }
  return response
}

function update(id, body) {
  const errors = []

  let data = fs.readFileSync('./accts.data.json', 'utf-8')
  data = JSON.parse(data)

  const acct = data.accts.find(acct => acct.id === id)

  console.log('TWO', acct);
  const {
    name,
    bankName,
    description
  } = body
  console.log('THREE', name, bankName, description);

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
    console.log('FOUR', name, bankName, description);

    // console.log('FIVE', tran);

    response = acct
    data = JSON.stringify(data)
    fs.writeFileSync('./accts.data.json', data)
  }
  return response
}

function destroy(id) {
  const errors = []
  let data = fs.readFileSync('./accts.data.json', 'utf-8')
  data = JSON.parse(data)

  const acct = data.accts.find(acct => acct.id === id)
  let response

  if (!acct) {
    errors.push(`Could not find acct with id of ${id}`)
    response = {
      errors
    }
  } else {
    const index = data.accts.indexOf(acct)
    data.accts.splice(index, 1)
    data = JSON.stringify(data)
    fs.writeFileSync('./accts.data.json', data)

    response = ''
  }
  return response
}

/////// trans // trans // trans //////

function getAllTrans(id) {
  let data = fs.readFileSync('./accts.data.json', 'utf-8')
  data = JSON.parse(data)
  const acct = data.accts.find(acct => acct.id === id)

  return acct.trans
}

function getOneTrans(id, transId) {
  let data = fs.readFileSync('./accts.data.json', 'utf-8')
  data = JSON.parse(data)
  const acct = data.accts.find(acct => acct.id === id)
  const tran = acct.trans.find(tran => tran.transId === transId)
  if (!acct) return 'error'
  return tran
}

function createTrans(id, body) {
  let data = fs.readFileSync('./accts.data.json', 'utf-8')
  data = JSON.parse(data)
  const acct = data.accts.find(acct => acct.id === id)
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
    // data.tran.push(tran)
    response = tran
    data = JSON.stringify(data)
    fs.writeFileSync('./accts.data.json', data)
  }
  return response
}

function updateTrans(id, transId, body) {
  const errors = []
  let data = fs.readFileSync('./accts.data.json', 'utf-8')
  data = JSON.parse(data)
  const acct = data.accts.find(acct => acct.id === id)

  const tran = acct.trans.find(tran => tran.transId === transId)

  const {
    title,
    amount,
    pending
  } = body
  // console.log('THREE', title, amount, pending);
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
    // console.log('FOUR', tran);
    tran.transId = transId
    tran.title = title
    tran.amount = amount
    tran.pending = pending
    // console.log('FIVE', tran);
    response = tran

    data = JSON.stringify(data)
    fs.writeFileSync('./accts.data.json', data)
  }
  return response
}

function destroyTrans(id, transId) {
  const errors = []

  let data = fs.readFileSync('./accts.data.json', 'utf-8')
  data = JSON.parse(data)
  let response

  const acct = data.accts.find(acct => acct.id === id)
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
    data = JSON.stringify(data)
    fs.writeFileSync('./accts.data.json', data)
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
