import { HttpResponse, http } from 'msw'
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

const createStreamResponse = ({ textChunks, interval = 100 }: { textChunks: string[]; interval?: number }) => {
  const stream = new ReadableStream({
    async start(controler) {
      const messager = createChatMessager(controler)
      let message = ''
      for (const chunk of textChunks) {
        await sleep(interval)
        message += chunk
        messager.send(message)
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
  http.post('/api/chat-process', () => {
    const response = createStreamResponse({
      textChunks: ['哎', '，', '开心', '的', '锣鼓', '敲出', '年年', '的', '喜庆', '。', '好', '看', '的', '舞蹈', '送来', '天天', '的', '欢腾', '。', '阳光', '的', '油彩', '涂红', '了', '今天', '的', '日子', '哟', '生活的', '花朵', '是', '我们', '的', '笑容', '。', '哎', '今天', '是', '个', '好', '日子', '心想', '的', '事儿', '都', '能', '成', '打开了', '家门', '咱', '迎', '春风', '。', '哎', '门外的', '灯笼', '露出', '红红', '的', '光景', '好听', '的', '歌儿', '传达', '浓浓', '的', '深情', '。', '月光', '的', '水彩', '涂亮', '明天', '的', '日子', '哟', '美好', '的', '世界', '在', '我们', '的', '心中', '。', '哎', '明天', '又', '是', '好', '日子', '千金', '的', '光阴', '不', '能', '等', '赶上了', '盛世', '咱', '享', '太平', '。', '今天', '是', '个', '好', '日子', '心想', '的', '事儿', '都', '能', '成', '明天', '又', '是', '好', '日子', '千金', '的', '光阴', '不', '能', '等', '今天', '明天', '都是', '好', '日子', '赶上了', '盛世', '咱', '享', '太平', '。'],
    })
    return response
  }),
]

export default handlers
