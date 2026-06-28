import { createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_CONFIG, mergeConfig } from './defaults'

const CACHE_KEY = 'mc_site_config_v1'

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function writeCache(config) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(config)) } catch {}
}

const cached = readCache()

const ConfigContext = createContext({ config: DEFAULT_CONFIG, ready: false })

export function ConfigProvider({ children }) {
  // If we have a cache, start ready immediately — no flash on repeat visits.
  // If no cache (first ever visit), start NOT ready — hold the render until
  // the API responds so we never show placeholder content at all.
  const [config, setConfig] = useState(cached ? mergeConfig(cached) : DEFAULT_CONFIG)
  const [ready, setReady] = useState(!!cached)

  useEffect(() => {
    let active = true
    fetch('/api/config')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!active) return
        if (data?.config) {
          const merged = mergeConfig(data.config)
          setConfig(merged)
          writeCache(data.config)
        }
      })
      .catch(() => {})
      .finally(() => { if (active) setReady(true) })
    return () => { active = false }
  }, [])

  // On first visit, hold children until the API responds.
  // The site background is #0A0A0A — user just sees a dark screen for ~200ms.
  // On all subsequent visits, `ready` starts true so nothing is held.
  if (!ready) {
    return <div style={{ position: 'fixed', inset: 0, background: '#0A0A0A' }} />
  }

  return (
    <ConfigContext.Provider value={{ config, ready }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  return useContext(ConfigContext).config
}

export function useConfigState() {
  return useContext(ConfigContext)
}

export function updateConfigCache(config) {
  writeCache(config)
}
