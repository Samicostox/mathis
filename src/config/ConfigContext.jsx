import { createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_CONFIG, mergeConfig } from './defaults'

const ConfigContext = createContext({ config: DEFAULT_CONFIG, loading: true })

export function ConfigProvider({ children }) {
  // Start with defaults so the site never renders empty, then hydrate from API.
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch('/api/config')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && data && data.config) setConfig(mergeConfig(data.config))
      })
      .catch(() => {/* offline / no backend → keep defaults */})
      .finally(() => active && setLoading(false))
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
