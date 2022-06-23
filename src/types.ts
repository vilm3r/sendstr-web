export type NostrSub = ({
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
  }) => Promise<void>
  filter: Record<string, string[]>[]
}) => {
  unsub: () => void
}

export type NostrPublish = ({
  pubkey,
  created_at,
  kind,
  tags,
  content,
}: {
  pubkey: string
  created_at: number
  kind: number
  tags: [[string, string]]
  content: string
}) => Promise<void>

export type NostrPool = {
  setPrivateKey: (priv: string) => void
  addRelay: (url: string, { read, write }: { read: boolean; write: boolean }) => void
  sub: NostrSub
  publish: NostrPublish
}

export type NostrType = {
  priv: string
  pub: string
  pool: NostrPool | null
  sub: {
    unsub: () => void
  } | null
}

export type NostrEventType = {
  content: string
  created_at: number
  id: string
  kind: number
  pubkey: string
  message: string
  sig: string
  tags: [[string, string]]
}
