const modules = import.meta.glob('./*.handlers.ts', { eager: true })
const subHandlers = Object.values(modules).map((m: any) => m.default)

const concat = <T extends any[]>(...args: T[]) => {
  if (args.length === 0)
    return []
  return args[0].concat(...args.slice(1))
}

export const handlers = concat(...subHandlers)
