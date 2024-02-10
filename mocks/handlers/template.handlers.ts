import { HttpResponse, http } from 'msw'

const handlers = [
  http.get('/api/v1/template', () => {
    return HttpResponse.json({ msg: 'Message from msw' }, { status: 200 })
  }),
]

export default handlers
