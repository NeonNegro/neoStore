import { useEffect, useMemo, useState } from 'react'
import Botao from '../components/Botao.jsx'
import Selo from '../components/Selo.jsx'
import Vitrine from '../components/Vitrine.jsx'
import { getCategories, getProducts } from '../services/trefleApi.js'

function HomePage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCatalog() {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const [nextProducts, nextCategories] = await Promise.all([
          getProducts(),
          getCategories(),
        ])

        if (!isMounted) return;

        setProducts(nextProducts)
        setCategories(nextCategories)
      } catch (error) {
        if (!isMounted) return

        setErrorMessage(
          error.message || 'Nao foi possivel carregar os produtos da Verdil agora.',
        )
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadCatalog()

    return () => {
      isMounted = false
    }
  }, [])

  const categoryOptions = useMemo(
    () => [{ label: 'Todas', slug: 'todas' }, ...categories],
    [categories],
  )

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Ajustado: Compara o "slug" (family.name) exato que o select usa
      const matchesCategory =
        selectedCategory === 'todas' || 
        (product.category && product.category === selectedCategory)
        
      const normalizedSearch = search.trim().toLowerCase()
      const matchesSearch =
        !normalizedSearch ||
        (product.title && product.title.toLowerCase().includes(normalizedSearch)) ||
        (product.description && product.description.toLowerCase().includes(normalizedSearch))

      return matchesCategory && matchesSearch
    })
  }, [products, search, selectedCategory])

  return (
    <>
      <section className="hero-home">
        <div className="hero-home__copy">
          <Selo tone="accent">Curadoria para colecionadores</Selo>
          <h1>Verdil transforma raridades botanicas em ativos de desejo.</h1>
          <p>
            Um esqueleto premium para a sua loja, com cara de mercado seleto e foco em
            plantas ornamentais de alto valor percebido.
          </p>

          <div className="hero-home__actions">
            <Botao>Explorar catalogo</Botao>
            <Botao variant="secondary">Ver especies em destaque</Botao>
          </div>
        </div>

        <div className="hero-home__panel">
          <div className="metric-card">
            <span>Indice Verdil</span>
            <strong>+18,4%</strong>
            <p>demanda por plantas raras nas ultimas semanas</p>
          </div>
          <div className="metric-card">
            <span>Categoria em alta</span>
            <strong>Veludo</strong>
            <p>texturas escuras e folhas cenicas liderando a curadoria</p>
          </div>
        </div>
      </section>

      <section className="painel painel--filters">
        <div>
          <p className="eyebrow">Busca estrategica</p>
          <h2>Catalogo real conectado a Trefle.io.</h2>
        </div>

        <div className="filters">
          <input
            className="input"
            type="text"
            placeholder="Buscar planta, especie ou colecao"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="input"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            disabled={isLoading}
          >
            {categoryOptions.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {isLoading ? (
        <section className="estado-vazio">
          <p className="eyebrow">Carregando</p>
          <h1>Montando a vitrine em tempo real.</h1>
          <p>Os produtos da Trefle.io estao sendo buscados para abrir o mercado.</p>
        </section>
      ) : null}

      {!isLoading && errorMessage ? (
        <section className="estado-vazio">
          <p className="eyebrow">Falha na carga</p>
          <h1>O catalogo nao respondeu agora.</h1>
          <p>{errorMessage}</p>
          <Botao onClick={() => window.location.reload()}>Tentar novamente</Botao>
        </section>
      ) : null}

      {!isLoading && !errorMessage ? (
        filteredProducts.length > 0 ? (
          <Vitrine
            title="Abertura do mercado"
            subtitle={`${filteredProducts.length} produtos posicionados no primeiro release da loja.`}
            products={filteredProducts}
          />
        ) : (
          <section className="estado-vazio">
            <p className="eyebrow">Sem resultados</p>
            <h1>Nenhum ativo listado.</h1>
            <p>Nao encontramos plantas que combinem com a busca ou categoria selecionada.</p>
            <Botao onClick={() => { setSearch(''); setSelectedCategory('todas') }}>
              Limpar filtros
            </Botao>
          </section>
        )
      ) : null}
    </>
  )
}

export default HomePage
