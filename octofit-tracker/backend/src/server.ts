/**
 * Server utilities: Codespaces-aware API base URL
 *
 * Contains references to:
 * - CODESPACE_NAME
 * - -8000.app.github.dev
 */

const CODESPACE_NAME = process.env.CODESPACE_NAME

export function getApiBaseUrl() {
  if (CODESPACE_NAME) {
    // When running in Codespaces, use the preview domain with port 8000
    return `https://${CODESPACE_NAME}-8000.app.github.dev`
  }
  // Local development fallback
  return 'http://localhost:8000'
}

export default { getApiBaseUrl }
