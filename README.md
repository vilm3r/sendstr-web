# Sendstr-web

Access the web app: [https://sendstr.com](https://sendstr.com)

Sendstr is an e2e encrypted shared clipboard web app powered by Nostr.

The main motivation to build Sendstr was to provide a quick and easy way to transfer text and files (coming soon) between devices. Sendstr defaults to a self-hosted Nostr relay but can easily be configured to point elsewhere.

## Build
```
cd sendstr-web
npm i
npm run export
```

Then copy the contents of `./out` to your favorite static content host.

## Future Features

- [] Two-way collaboration
- [] File sharing
- [] FAQ Page
- [] Themes and Light/Dark support
- [] React native client
- [] Support non-throwaway credentials

## License

Distributed under the MIT License. See [LICENSE file](LICENSE).