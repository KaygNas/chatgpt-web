// Mock Service Worker is an API mocking library that uses Service Worker API to intercept actual requests.
// https://mswjs.io/docs/
import { setupWorker } from 'msw/browser'

import { handlers } from './handlers'

const worker = setupWorker(...handlers)

export const setupMsw = async () => {
  if (import.meta.env.PROD) {
    // TODO remove
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
  else {
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}
