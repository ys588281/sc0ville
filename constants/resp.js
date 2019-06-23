const dbError = {
  status: 500,
  reason: "Operate db error"
}

const notFoundError = {
  status: 404,
  reason: "data not found"
}

const badRequestError = {
  status: 400,
  reason: "invalid params"
}

const noBodyError = {
  status: 400,
  reason: "no body found"
}

const noParamError = {
  status: 400,
  reason: "no params found"
}

const authError = {
  status: 401,
  reason: "invalid token"
}

module.exports = {
  dbError,
  notFoundError,
  badRequestError,
  noBodyError,
  noParamError,
  authError
}
