import { put } from '@vercel/blob'
import { isAuthed } from './_lib.js'

// Simple multipart upload: the browser sends a FormData POST,
// we call Vercel Blob put() server-side and return the public URL.
// No client-token negotiation needed.
export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!isAuthed(req)) {
    return res.status(401).json({ error: 'Non autorisé.' })
  }

  try {
    // Read raw body into a Buffer
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const buf = Buffer.concat(chunks)

    // Pull filename and content-type from headers set by the client
    const filename = decodeURIComponent(req.headers['x-filename'] || 'upload')
    const contentType = req.headers['content-type'] || 'application/octet-stream'

    const blob = await put(filename, buf, {
      access: 'public',
      contentType,
      addRandomSuffix: true,
    })

    return res.status(200).json({ url: blob.url })
  } catch (err) {
    return res.status(500).json({ error: String(err?.message || err) })
  }
}
