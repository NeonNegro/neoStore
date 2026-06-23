import { useMemo, useState } from 'react'
import { AuthContext } from './auth-context.js'
import { loginWithFakeApi, signupWithFakeApi } from '../services/fakeAuth.js'

const STORAGE_KEY = 'verdil.auth'

function getStoredSession() {
  if (typeof window === 'undefined') {
    return null
  }

  const savedSession = localStorage.getItem(STORAGE_KEY)

  if (!savedSession) {
    return null
  }

  try {
    return JSON.parse(savedSession)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getStoredSession)

  const value = useMemo(() => {
    const login = async ({ username, password }) => {
      if (!username || !password) {
        throw new Error('Preencha usuario e senha para continuar.')
      }

      const nextSession = await loginWithFakeApi({ password, username })

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
      setSession(nextSession)
      return nextSession
    }

    const signup = async ({
      confirmPassword,
      email,
      firstName,
      lastName,
      password,
      username,
    }) => {
      if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
        throw new Error('Preencha todos os campos para criar sua conta.')
      }

      if (password !== confirmPassword) {
        throw new Error('As senhas nao conferem.')
      }

      const nextSession = await signupWithFakeApi({
        email,
        firstName,
        lastName,
        password,
        username,
      })

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
      setSession(nextSession)
      return nextSession
    }

    const logout = () => {
      localStorage.removeItem(STORAGE_KEY)
      setSession(null)
    }

    return {
      isAuthenticated: Boolean(session?.accessToken),
      login,
      logout,
      session,
      signup,
    }
  }, [session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
