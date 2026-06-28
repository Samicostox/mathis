import { createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_CONFIG, mergeConfig } from './defaults'

const CACHE_KEY = 'mc_site_config_v1'

// Read the last known config from localStorage synchronously.
// This means on every visit after the first, the page renders with
// real data immediately — no placeholder flash.
function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeCache(config) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(config))
  } catch {/* storage full or private mode */}
}

// Initialise synchronously from cache (or defaults if no cache yet).
function getInitial() {
  const cached = readCache()
  return cached ? mergeConfig(cached) : DEFAULT_CONFIG
}

const ConfigContext = createContext({ config: DEFAULT_CONFIG, loading: true })

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(getInitial)  // synchronous — no flash
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch('/api/config')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!active) return
        if (data && data.config) {
          const merged = mergeConfig(data.config)
          setConfig(merged)
          writeCache(data.config)   // persist so next load is instant
        }
      })
      .catch(() => {/* offline / no backend → keep cache or defaults */})
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return (
    <ConfigContext.Provider value={{ config, loading }}>
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

// Call this after a successful admin save so the cache is immediately
// updated — the public site will reflect the change on next load too.
export function updateConfigCache(config) {
  writeCache(config)
}
