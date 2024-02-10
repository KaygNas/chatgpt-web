import { HttpResponse, http } from 'msw'
import HAORIZI_TEXT from './haorizi.md?raw'
import CODE_EXAMPLE_TEXT from './code-example.md?raw'
import type { ChatMessage } from '@/../service/src/chatgpt'

const sleep = async (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

const createChatMessager = (controler: ReadableStreamDefaultController) => {
  const encoder = new TextEncoder()
  let firstChunk = true
  const send = (text: string) => {
    const chatMessage: ChatMessage = {
      id: '--',
      role: 'assistant',
      text,
    }
    let response = JSON.stringify(chatMessage)
    if (!firstChunk)
      response = `\n${response}`

    firstChunk = false

    controler.enqueue(encoder.encode(response))
  }

  const end = () => {
    controler.close()
  }

  return { send, end }
}

const createStreamResponse = ({ markdownText, interval = 100 }: { markdownText: string; interval?: number }) => {
  const stream = new ReadableStream({
    async start(controler) {
      const messager = createChatMessager(controler)
      for (let i = 0; i < markdownText.length; i += 5) {
        await sleep(interval)
        messager.send(markdownText.slice(0, i))
      }
      messager.end()
    },
  })
  return new HttpResponse(stream, {
    headers: {
      'Content-type': 'application/octet-stream',
    },
  })
}

const handlers = [
  http.post('/api/chat-process', async ({ request }) => {
    const requestData: any = await request.json()
    const agentUuid = requestData.options.agentUuid
    if (agentUuid === 0) {
      const response = createStreamResponse({
        markdownText: CODE_EXAMPLE_TEXT,
      })
      return response
    }
    else {
      const response = createStreamResponse({
        markdownText: HAORIZI_TEXT,
      })
      return response
    }
  }),
]

export default handlers
