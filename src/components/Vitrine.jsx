import ProdutoCard from './ProdutoCard.jsx'

function Vitrine({ products, title, subtitle }) {
  return (
    <section className="secao">
      <div className="secao__header">
        <div>
          <p className="eyebrow">Mercado botanico</p>
          <h2>{title}</h2>
        </div>
        <p className="secao__subtitle">{subtitle}</p>
      </div>

      {products.length ? (
        <div className="vitrine-grid">
          {products.map((product) => (
            <ProdutoCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="estado-vazio estado-vazio--embedded">
          <h3>Nenhum produto combina com essa busca.</h3>
          <p>Altere o termo pesquisado ou selecione outra categoria para continuar.</p>
        </div>
      )}
    </section>
  )
}

export default Vitrine
