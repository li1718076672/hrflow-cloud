export const saveAuthData = (data) => {
  localStorage.setItem('accessToken', data.access_token)
  localStorage.setItem('user', JSON.stringify(data.user))
}

export const getAuthToken = () => {
  return localStorage.getItem('accessToken')
}

export const getUser = () => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

export const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
}