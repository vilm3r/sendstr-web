import { Relay, Sub } from "nostr-tools"

export type NostrSubType = ({
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

export type NostrPublishType = ({
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

export type NostrPoolType = {
  setPrivateKey: (priv: string) => void
  addRelay: (url: string, { read, write }: { read: boolean; write: boolean }) => void
  subs: NostrSubType
  publish: NostrPublishType
}

export type NostrType = {
  priv: string
  pub: string
  subs: Sub[],
  relays: Relay[]
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

export type NostrKeysType = {
  pub: string
  priv: string
}
