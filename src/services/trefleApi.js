import fallbackData from '../data/trefle-fallback.json'

/**
 * @typedef {Object} TreflePlant
 * @property {number} id
 * @property {string} common_name
 * @property {string} scientific_name
 * @property {string} family_common_name
 * @property {string} family
 * @property {number} year
 * @property {string} image_url
 * @property {string[]} synonyms
 */

/**
 * @typedef {Object} TrefleResponse
 * @property {TreflePlant[]} data
 * @property {Object} meta
 * @property {Object} links
 */

// Usamos um caminho relativo para bater no nosso próprio domínio
// Isso será interceptado pelo Vite (local) e pela Vercel (produção) para evitar CORS
const BASE_URL = '/api/trefle'

// O Trefle requer um token de acesso para funcionar.
// Como não temos no ambiente ainda, deixamos preparado para ler do .env
const TREFLE_TOKEN = import.meta.env.VITE_TREFLE_TOKEN

async function fetchJson(path, options = {}) {
  if (!TREFLE_TOKEN) 
    throw new Error('Sem token configurado para Trefle.io. Adicione VITE_TREFLE_TOKEN no .env')

  const separator = path.includes('?') ? '&' : '?'
  const targetUrl = `${BASE_URL}${path}${separator}token=${TREFLE_TOKEN}`
  
  const response = await fetch(targetUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Nao foi possivel concluir a requisicao no Trefle.io.')
  }

  return data
}

function mapTrefleToProduct(plant) {
  return {
    id: plant.id,
    title: plant.common_name || plant.scientific_name || 'Planta Rara',
    description: `Família: ${plant.family_common_name || plant.family || 'Desconhecida'}. Ano: ${plant.year || 'N/D'}.`,
    price: 150 + (plant.id % 500), // Preço ficticio gerado a partir do ID
    category: plant.family || 'Geral',
    thumbnail: plant.image_url || 'https://images.unsplash.com/photo-1596547609652-9cb5d8d736bb?auto=format&fit=crop&q=80&w=800',
    stock: 10,
    rating: 4.8,
  }
}

export function formatCategoryLabel(category) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export async function getProducts() {
  if (!TREFLE_TOKEN) {
    return (fallbackData.data ?? []).map(mapTrefleToProduct)
  }

  try {
    const data = await fetchJson('/plants')
    return (data.data ?? []).map(mapTrefleToProduct)
  } catch (err) {
    console.error("Falha ao buscar Trefle:", err)
    return (fallbackData.data ?? []).map(mapTrefleToProduct)
  }
}

export async function getProductById(productId) {
  if (!TREFLE_TOKEN) {
    const plant = (fallbackData.data ?? []).find((p) => p.id === Number(productId))
    return plant ? mapTrefleToProduct(plant) : null
  }

  try {
    const data = await fetchJson(`/plants/${productId}`)
    return mapTrefleToProduct(data.data)
  } catch (err) {
    console.error("Falha ao buscar Trefle id:", err)
    const plant = (fallbackData.data ?? []).find((p) => p.id === Number(productId))
    return plant ? mapTrefleToProduct(plant) : null
  }
}

export async function getCategories() {
  const uniqueFamilies = Array.from(
    new Set((fallbackData.data ?? []).map((p) => p.family).filter(Boolean))
  ).map((family) => ({
    label: family,
    slug: family,
  }))

  if (!TREFLE_TOKEN) return uniqueFamilies

  try {
    const data = await fetchJson('/families')
    return (data.data ?? []).slice(0, 10).map((family) => ({
      label: family.common_name || family.name,
      slug: family.name,
    }))
  } catch (err) {
    console.error("Falha ao buscar Trefle familias:", err)
    return uniqueFamilies
  }
}


