import { isAuthed } from './_lib.js'

// Validates the admin password so the admin UI can confirm login.
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD non configuré côté serveur.' })
  }
  if (isAuthed(req)) return res.status(200).json({ ok: true })
  return res.status(401).json({ error: 'Mot de passe invalide.' })
}
