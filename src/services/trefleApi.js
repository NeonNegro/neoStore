const BASE_URL = 'https://trefle.io/api/v1'

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
    return getMockPlants()
  }

  const data = await fetchJson('/plants')
  return (data.data ?? []).map(mapTrefleToProduct)
}

export async function getProductById(productId) {
  if (!TREFLE_TOKEN) {
    return getMockPlants().find((p) => p.id === Number(productId))
  }

  const data = await fetchJson(`/plants/${productId}`)
  return mapTrefleToProduct(data.data)
}

export async function getCategories() {
  if (!TREFLE_TOKEN) {
    return [
      { label: 'Araceae', slug: 'Araceae' },
      { label: 'Orchidaceae', slug: 'Orchidaceae' },
      { label: 'Moraceae', slug: 'Moraceae' },
    ]
  }

  const data = await fetchJson('/families')
  return (data.data ?? []).slice(0, 10).map((family) => ({
    label: family.common_name || family.name,
    slug: family.name,
  }))
}

// Fallback Mock de plantas para o app nao quebrar sem token
function getMockPlants() {
  return [
    {
      id: 101,
      title: 'Monstera Deliciosa',
      description: 'Uma planta icônica de folhas furadas, excelente para ambientes internos com boa luz indireta.',
      price: 180.5,
      category: 'Araceae',
      thumbnail: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
      stock: 15,
      rating: 4.9,
    },
    {
      id: 102,
      title: 'Philodendron Pink Princess',
      description: 'Variedade muito procurada com manchas rosas vibrantes nas folhas escuras.',
      price: 450.0,
      category: 'Araceae',
      thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
      stock: 3,
      rating: 5.0,
    },
    {
      id: 103,
      title: 'Ficus Elastica Albo',
      description: 'Ficus clássico com variação de cores incríveis entre branco e verde claro.',
      price: 210.0,
      category: 'Moraceae',
      thumbnail: 'https://images.unsplash.com/photo-1600411832986-5a4477b64a1c?auto=format&fit=crop&q=80&w=800',
      stock: 8,
      rating: 4.5,
    },
    {
      id: 104,
      title: 'Phalaenopsis Rara',
      description: 'Orquídea de coleção com coloração negra/roxa intensa.',
      price: 320.0,
      category: 'Orchidaceae',
      thumbnail: 'https://images.unsplash.com/photo-1596547609652-9cb5d8d736bb?auto=format&fit=crop&q=80&w=800',
      stock: 5,
      rating: 4.7,
    }
  ]
}
