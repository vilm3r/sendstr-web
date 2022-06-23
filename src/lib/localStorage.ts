export type SettingsRelay = {
  url: string
  enabled: boolean
}

export const getRelays = (): SettingsRelay[] =>
  JSON.parse(
    window.localStorage.getItem("relays") ||
      JSON.stringify([
        {
          url: "wss://relay.sendstr.com",
          enabled: true,
        },
      ]),
  ) as SettingsRelay[]

export const setRelays = (relays: SettingsRelay[]) =>
  window.localStorage.setItem("relays", JSON.stringify(relays))

export const addRelay = (relay: SettingsRelay) =>
  window.localStorage.setItem("relays", JSON.stringify([...getRelays(), relay]))

export const removeRelay = (relay: string) =>
  window.localStorage.setItem("relays", JSON.stringify(getRelays().filter((x) => x.url !== relay)))

export const toggleRelay = (relay: string) =>
  window.localStorage.setItem(
    "relays",
    JSON.stringify(
      getRelays().reduce((acc, x) => {
        if (x.url === relay)
          return [
            ...acc,
            {
              url: x.url,
              enabled: !x.enabled,
            },
          ]
        return [...acc, x]
      }, [] as SettingsRelay[]),
    ),
  )
