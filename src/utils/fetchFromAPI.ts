function setHeaders(headers?: HeadersInit) {
  let headersForAuth = {}
  if (typeof window !== 'undefined') {
    headersForAuth = {
      'access-token': localStorage.getItem('access-token') || '',
      client: localStorage.getItem('client') || '',
      uid: localStorage.getItem('uid') || '',
      'Content-Type': 'application/json',
    }
  }

  const headerValues = headers ? Object.assign(headersForAuth, headers) : headersForAuth
  return headerValues
}

export async function getWithToken(path: string, headers?: HeadersInit) {
  const headerValues = setHeaders(headers)

  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method: 'GET',
    headers: headerValues,
  })
}

export async function postWithToken(path: string, body?: any, headers?: HeadersInit) {
  const headerValues = setHeaders(headers)

  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method: 'POST',
    headers: headerValues,
    body: JSON.stringify(body),
  })
}

export async function deleteWithToken(path: string, headers?: HeadersInit) {
  const headerValues = setHeaders(headers)

  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method: 'DELETE',
    headers: headerValues,
  })
}
