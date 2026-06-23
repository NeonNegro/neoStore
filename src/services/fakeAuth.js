const USERS_STORAGE_KEY = 'verdil.users'

const DEFAULT_USERS = [
  {
    email: 'aluno@verdil.store',
    firstName: 'Aluno',
    id: 'verdil-seed-user',
    lastName: 'Demo',
    password: '1234',
    username: 'aluno',
  },
]

function wait(ms = 700) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function readUsers() {
  const savedUsers = localStorage.getItem(USERS_STORAGE_KEY)

  if (!savedUsers) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS))
    return DEFAULT_USERS
  }

  try {
    const parsedUsers = JSON.parse(savedUsers)

    if (!Array.isArray(parsedUsers) || !parsedUsers.length) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS))
      return DEFAULT_USERS
    }

    return parsedUsers
  } catch {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS))
    return DEFAULT_USERS
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function sanitizeUser(user) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => key !== 'password'),
  )
}

function buildSession(user) {
  return {
    accessToken: `verdil-token-${user.id}-${Date.now()}`,
    refreshToken: `verdil-refresh-${user.id}`,
    user: sanitizeUser(user),
  }
}

export async function loginWithFakeApi({ username, password }) {
  await wait()

  const users = readUsers()
  const normalizedUsername = username.trim().toLowerCase()
  const normalizedPassword = password.trim()

  const user = users.find(
    (entry) =>
      entry.username.toLowerCase() === normalizedUsername &&
      entry.password === normalizedPassword,
  )

  if (!user) {
    throw new Error('Usuario ou senha invalidos.')
  }

  return buildSession(user)
}

export async function signupWithFakeApi({
  email,
  firstName,
  lastName,
  password,
  username,
}) {
  await wait()

  const users = readUsers()
  const normalizedUsername = username.trim().toLowerCase()
  const normalizedEmail = email.trim().toLowerCase()

  if (users.some((user) => user.username.toLowerCase() === normalizedUsername)) {
    throw new Error('Esse nome de usuario ja esta em uso.')
  }

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error('Esse email ja foi cadastrado.')
  }

  const newUser = {
    email: normalizedEmail,
    firstName: firstName.trim(),
    id: crypto.randomUUID(),
    lastName: lastName.trim(),
    password,
    username: normalizedUsername,
  }

  saveUsers([...users, newUser])

  return buildSession(newUser)
}
