import { HttpResponse, http } from 'msw'

const handlers = [
  http.post('/chatgpt-web/api/session', () => {
    return HttpResponse.json(
      { status: 'Success', message: '', data: { auth: false, model: 'ChatGPTAPI' } },
      { status: 200 },
    )
  }),
]

export default handlers
