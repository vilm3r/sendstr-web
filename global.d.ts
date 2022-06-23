declare module "remark-html" {
  const html: any
  export default html
}

declare module "nostr-tools" {
  export const generatePrivateKey: () => string
  export const getPublicKey: (priv: string) => string
  export const relayPool: () => {
    setPrivateKey: (priv: string) => void
    addRelay: (url: string, { read: boolean, write: boolean }) => void
    publish: ({pubkey, created_at, kind, tags, content}: {
      pubkey: string,
      created_at: number,
      kind: number,
      tags: [[string,string]],
      content: string,
    }) => Promise<void>,
    sub: ({
      cb,
      filter,
    }: {
      cb: (event: {
        content: string
        created_at: number
        id: string
        kind: number
        pubkey: string
        message: string
        sig: string
        tags: [[string, string]]
      }) => void
      filter: Record<string, string[]>[]
    }) => {
      unsub: () => void
    }
  }
}

declare module "nostr-tools/nip04" {
  export const decrypt: (priv: string, pub: string, message: string) => string
  export const encrypt: (priv: string, pub: string, message: string) => string
}
declare module "toastify-js" {
  const Toastify: ({
    text,
    duration,
    close,
    gravity,
    position,
    stopOnFocus,
    className,
  }: {
    text: string
    duration: number
    close: boolean
    gravity: string
    position: string
    stopOnFocus: boolean
    className: string
  }) => {
    showToast: () => void
  }
  export = Toastify
}