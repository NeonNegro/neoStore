import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao.jsx'
import { useAuth } from '../context/useAuth.jsx'

function SignupPage() {
  const [form, setForm] = useState({
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (field) => (event) => {
    setForm((currentForm) => ({ ...currentForm, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setErrorMessage('')
      await signup(form)
      navigate('/minha-conta', { replace: true })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-copy">
        <p className="eyebrow">Cadastro local</p>
        <h1>Crie sua conta com uma API simulada no proprio navegador.</h1>
        <p>
          Para este trabalho, o cadastro fica salvo no `localStorage`, sem backend,
          mantendo o fluxo estavel para avaliacao.
        </p>
        <p className="feedback">Conta demo disponivel: `aluno` / `1234`.</p>
        <Link className="inline-link" to="/login">
          Ja tenho conta
        </Link>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-grid">
          <label className="field">
            <span>Nome</span>
            <input
              className="input"
              type="text"
              value={form.firstName}
              onChange={handleChange('firstName')}
              placeholder="Rodrigo"
            />
          </label>

          <label className="field">
            <span>Sobrenome</span>
            <input
              className="input"
              type="text"
              value={form.lastName}
              onChange={handleChange('lastName')}
              placeholder="Chaves"
            />
          </label>
        </div>

        <label className="field">
          <span>Email</span>
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="voce@verdil.store"
          />
        </label>

        <label className="field">
          <span>Usuario</span>
          <input
            className="input"
            type="text"
            value={form.username}
            onChange={handleChange('username')}
            placeholder="colecionador"
          />
        </label>

        <div className="auth-grid">
          <label className="field">
            <span>Senha</span>
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              placeholder="Crie uma senha"
            />
          </label>

          <label className="field">
            <span>Confirmar senha</span>
            <input
              className="input"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              placeholder="Repita a senha"
            />
          </label>
        </div>

        {errorMessage ? <p className="feedback feedback--error">{errorMessage}</p> : null}

        <Botao type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </Botao>
      </form>
    </section>
  )
}

export default SignupPage
