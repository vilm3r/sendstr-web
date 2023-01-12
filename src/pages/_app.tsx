import "../styles/global.css"
import { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { ThemeProvider } from "next-themes"

export default function App({ Component, pageProps }: AppProps) {
  const [keys, setKeys] = useState<{
    pub: string
    priv: string
  } | null>(null)

  useEffect(() => {
    void (async () => {
      const { generatePrivateKey, getPublicKey } = await import("nostr-tools")
      const priv = generatePrivateKey()
      const pub = getPublicKey(priv)
      setKeys({ priv, pub })
    })()
  }, [])

  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme={"dark"}>
      <Component {...{ ...pageProps, keys }} />
    </ThemeProvider>
  )
}
