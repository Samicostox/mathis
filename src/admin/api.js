import { upload } from '@vercel/blob/client'

const PW_KEY = 'mc_admin_pw'

export function getStoredPassword() {
  return sessionStorage.getItem(PW_KEY) || ''
}

export function storePassword(pw) {
  sessionStorage.setItem(PW_KEY, pw)
}

export function clearPassword() {
  sessionStorage.removeItem(PW_KEY)
}

export async function login(password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'x-admin-password': password },
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'Connexion refusée.')
  }
  storePassword(password)
  return true
}

export async function saveConfig(config) {
  const res = await fetch('/api/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': getStoredPassword(),
    },
    body: JSON.stringify({ config }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'Échec de la sauvegarde.')
  }
  return true
}

// Uploads a file to Vercel Blob via the client-upload flow and returns its URL.
export async function uploadFile(file) {
  const result = await upload(file.name, file, {
    access: 'public',
    handleUploadUrl: '/api/upload',
    clientPayload: getStoredPassword(),
  })
  return result.url
}
