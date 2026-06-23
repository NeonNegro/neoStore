const BASE_URL = 'https://dummyjson.com'

async function fetchJson(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Nao foi possivel concluir a requisicao.')
  }

  return data
}

export function formatCategoryLabel(category) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export async function getProducts() {
  const data = await fetchJson('/products?limit=0')
  return data.products ?? []
}

export async function getProductById(productId) {
  return fetchJson(`/products/${productId}`)
}

export async function getCategories() {
  const data = await fetchJson('/products/categories')

  return data.map((entry) => {
    if (typeof entry === 'string') {
      return {
        label: formatCategoryLabel(entry),
        slug: entry,
      }
    }

    const slug = entry.slug || entry.name || ''
    return {
      label: entry.name || formatCategoryLabel(slug),
      slug,
    }
  })
}

export async function loginWithDummyJson(credentials) {
  return fetchJson('/auth/login', {
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 30,
    }),
    method: 'POST',
  })
}
