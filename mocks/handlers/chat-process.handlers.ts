import { HttpResponse, http } from 'msw'

const handlers = [
  http.post('/api/chat-process', () => {
    return HttpResponse.json({}, { status: 200 })
  }),
]

export default handlers
