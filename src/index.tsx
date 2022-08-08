import { enableAllPlugins } from 'immer'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/App'

enableAllPlugins()

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
