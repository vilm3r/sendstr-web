# Sendstr-web

Access the web app: [https://sendstr.com](https://sendstr.com)

Sendstr is an e2e encrypted bi-directional clipboard web app powered by Nostr.

The main motivation to build Sendstr was to provide a quick and easy way to transfer text and files (coming soon) between devices. Sendstr defaults to a self-hosted Nostr relay but can easily be configured to point elsewhere.

## Build

```
cd sendstr-web
npm i
npm run export
```

Then copy the contents of `./out` to your favorite static content host.

## Future Features

- [X] Two-way collaboration
- [ ] File sharing
- [ ] FAQ Page
- [X] Light/Dark support
- [ ] React native client
- [ ] Browser extension
- [ ] Support non-throwaway credentials
- [ ] Switch to ephemeral events with direct message as a fallback

## License

Distributed under the MIT License. See [LICENSE file](LICENSE).
