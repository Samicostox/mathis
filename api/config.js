import { sql, ensureTable, isAuthed, readBody } from './_lib.js'

export default async function handler(req, res) {
  try {
    await ensureTable()

    if (req.method === 'GET') {
      const rows = await sql`SELECT data FROM site_config WHERE id = 1`
      const config = rows.length ? rows[0].data : null
      // Public read — cache lightly at the edge but let it revalidate fast.
      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=60')
      return res.status(200).json({ config })
    }

    if (req.method === 'POST') {
      if (!isAuthed(req)) {
        return res.status(401).json({ error: 'Mot de passe invalide.' })
      }
      const body = readBody(req)
      const config = body.config
      if (!config || typeof config !== 'object') {
        return res.status(400).json({ error: 'Config manquante.' })
      }
      await sql`
        INSERT INTO site_config (id, data, updated_at)
        VALUES (1, ${JSON.stringify(config)}::jsonb, now())
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()
      `
      return res.status(200).json({ ok: true })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: String(err?.message || err) })
  }
}
