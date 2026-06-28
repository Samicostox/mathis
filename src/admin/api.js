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

// Uploads a file to Vercel Blob via our server-side /api/upload route.
// Sends the raw bytes with filename + content-type as headers.
export async function uploadFile(file) {
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'x-admin-password': getStoredPassword(),
      'x-filename': encodeURIComponent(file.name),
      'content-type': file.type || 'application/octet-stream',
    },
    body: file,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Échec de l\'upload.')
  return data.url
}
