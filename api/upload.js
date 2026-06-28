import { handleUpload } from '@vercel/blob/client'
import { readBody } from './_lib.js'

// Client-upload handler. The browser calls @vercel/blob/client `upload()`
// which negotiates a short-lived token here. We gate token creation on the
// admin password passed via clientPayload.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = readBody(req)

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const expected = process.env.ADMIN_PASSWORD
        if (!expected || clientPayload !== expected) {
          throw new Error('Non autorisé')
        }
        return {
          allowedContentTypes: [
            'image/png', 'image/jpeg', 'image/jpg', 'image/webp',
            'image/gif', 'image/avif', 'video/mp4', 'video/webm', 'video/quicktime',
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 50 * 1024 * 1024,
        }
      },
      onUploadCompleted: async () => {
        // No-op; the client already has the URL. (Skipped on localhost.)
      },
    })
    return res.status(200).json(jsonResponse)
  } catch (err) {
    return res.status(400).json({ error: String(err?.message || err) })
  }
}
