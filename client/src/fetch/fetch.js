const URL_BASE = 'http://localhost:5000'
const URL_DIRECTORY = '/api'

const standardHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

const getPostRequest = (urlPath, body) => {
  const init = {
    ...standardHeaders
  }
  const payload = {
    method: 'POST',
    headers: new Headers(init)
  }
  return promise(urlPath, payload, body)
}

const getRequest = urlPath => {
  const init = {
    ...standardHeaders
  }
  const payload = {
    method: 'GET',
    headers: new Headers(init)
  }
  return promise(urlPath, payload)
}

const getResponse = res => {
  if (res.ok && res.status === 204) {
    return Promise.resolve({
      status: res.status,
      message: 'No Content'
    })
  }
  if (res.ok) return res.json()
  return res.text()
    .then(error => JSON.parse(error))
    .then(error => {
      throw new Error(error.message)
    })
}

const promise = (urlPath, payload, body) => {
  return new Promise(resolve => {
    const url = `${URL_BASE}${URL_DIRECTORY}${urlPath}`
console.log('HERES MY URL', url)
    fetch(url, payload, body)
      .then(response => resolve(getResponse(response)))
      .catch(error => console.error('error', error))
  })
}

export const api = {
  get: (urlPath) => getRequest(urlPath),
  post: (urlPath, body) => getPostRequest(urlPath, body)
}