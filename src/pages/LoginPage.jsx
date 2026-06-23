import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao.jsx'
import { useAuth } from '../context/useAuth.jsx'

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from || '/minha-conta'

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setErrorMessage('')
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-copy">
        <p className="eyebrow">Acesso premium</p>
        <h1>Login local, persistente e pronto para avaliacao.</h1>
        <p>
          O fluxo agora e totalmente simulado no front, com sessao salva no
          `localStorage` e sem depender de backend externo.
        </p>
        <p className="feedback">Conta demo: `aluno` / `1234`.</p>
        <Link className="inline-link" to="/cadastro">
          Criar nova conta
        </Link>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <label className="field">
          <span>Usuario</span>
          <input
            className="input"
            type="text"
            value={form.username}
            onChange={(event) =>
              setForm((currentForm) => ({ ...currentForm, username: event.target.value }))
            }
            placeholder="aluno"
          />
        </label>

        <label className="field">
          <span>Senha</span>
          <input
            className="input"
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((currentForm) => ({ ...currentForm, password: event.target.value }))
            }
            placeholder="1234"
          />
        </label>

        {errorMessage ? <p className="feedback feedback--error">{errorMessage}</p> : null}

        <Botao type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Validando...' : 'Entrar'}
        </Botao>
      </form>
    </section>
  )
}

export default LoginPage
