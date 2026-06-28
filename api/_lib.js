import { neon } from '@neondatabase/serverless'

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED

export const sql = neon(connectionString)

// Lazily ensure the single-row config table exists.
let ensured = false
export async function ensureTable() {
  if (ensured) return
  await sql`
    CREATE TABLE IF NOT EXISTS site_config (
      id INT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `
  ensured = true
}

// Returns true if the request carries the correct admin password.
export function isAuthed(req) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const got = req.headers['x-admin-password']
  return typeof got === 'string' && got.length > 0 && got === expected
}

export function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string' && req.body.length) {
    try { return JSON.parse(req.body) } catch { return {} }
  }
  return {}
}
