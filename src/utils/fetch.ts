const defaultHeaders = {
  'Content-Type': 'application/json',
}

export async function fetchFromAPI(path: string, method: string, headers?: HeadersInit) {
  let headersForAuth = {}
  if (typeof window !== 'undefined') {
    headersForAuth = {
      'access-token': localStorage.getItem('access-token') || '',
      client: localStorage.getItem('client') || '',
      uid: localStorage.getItem('uid') || '',
    }
  }

  const headerValues = Object.assign({}, headersForAuth, headers ? headers : defaultHeaders)
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method,
    headers: headerValues,
  })
}
