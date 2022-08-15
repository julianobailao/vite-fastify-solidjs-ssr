# Vite Typescript Solidjs SSR

[![Node CI](https://github.com/julianobailao/vite-typescript-solidjs-ssr/actions/workflows/nodejs.yml/badge.svg)](https://github.com/julianobailao/vite-typescript-solidjs-ssr/actions/workflows/nodejs.yml)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/julianobailao/vite-fastify-solidjs-ssr.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/julianobailao/vite-fastify-solidjs-ssr/context:javascript)

A _blazingly_ modern web development stack. This template repo tries to achieve the minimum viable example for each of the following:

- [Solidjs 1.4](https://www.solidjs.com)
- [Fastify](https://www.fastify.io/)
- [Typescript 4.7](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/)
- [Vite with Vite SSR](https://vitejs.dev/guide/ssr.html)
- [Vitest](https://vitest.dev)
- [GitHub Actions](https://github.com/features/actions)
- [Tailwind CSS](https://tailwindui.com/)
- [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/)

## Development

```bash
yarn
yarn dev:server
```

That should start the server. It will open to http://localhost:7456.

### Controller n Handlers

We use [fastify-decorators](https://www.npmjs.com/package/fastify-decorators) to improve development of server routes based on controllers or request handlers.

To create a new, you just need to create a class following the oficial documentation and put then on server.ts along this:

```typescript
private async registerFastifyDecorators() {
    await this._web.register(fastifyDecorators, {
      controllers: [ApiHandler, SpaRendererHandler, StreamExampleHandler],// Put your controller / handler here
    });
}
```

## Building

```bash
yarn build
yarn serve
```

yarn build will create the assets in `dist` - a `client` and `server` folder. Serve will run `dist/server.js` with Node, but feel free to change this to use Docker or some other process manager to suit your deployment needs.

## Testing

Running all tests:

```bash
yarn test
```

### Client

Running all client tests:

```bash
yarn test:client
```

Client tests available:

```bash
yarn test:client:unit
yarn test:client:unit:coverage
yarn test:client:e2e
```

### Server

Running all server tests:

```bash
yarn test:server
```

Server tests available:

```bash
yarn test:server:unit
yarn test:server:unit:coverage
yarn test:server:e2e
```

### Vitest UI

That is pretty cool!

```bash
yarn test:client:unit:ui
yarn test:client:e2e:ui
yarn test:server:unit:ui
yarn test:server:e2e:ui
```

![image](https://user-images.githubusercontent.com/11247099/171992272-7c6057e2-80c3-4b17-a7b6-0ac28e5a5e0b.png)

See the oficial [vitest ui documentation](https://vitest.dev/guide/ui.html)

## Files

`aliases.ts` - Config alias to work with `@root` `@client` `@server` `@shared`

`eslintrc.js` - a barebones eslint configuration for 2021, that extends off of the recommended ESLint config and prettier

`.prettierrc.js` - the prettier config

`index.html` - the vite entrypoint, that includes the entry point for the client

`postcss.config.cjs` - CommonJS module that defines the PostCSS config

`server.ts` - The barebones Fastify server with logic for SSRing Vite pages with stream

`tailwind.config.cjs` - CommonJS module that defines the Tailwind config

`tsconfig.json` - TypeScript configuration

`vite.config.ts` - Vite configuration

`vite.config.default.ts` - Configuration shared between vite and vitest

`vitest.client.config.ts` - Vitest client unit tests configuration

`vitest.client.e2econfig.ts` - Vitest client e2e tests configuration

`vitest.server.config.ts` - Vitest server unit tests configuration

`vitest.server.e2e.config.ts` - Vitest server e2e tests configuration

## CI

We use GitHub actions to build the app. The badge is at the top of the repo. Currently it just confirms that everything builds properly.

## Thanks

This project is inspired on [https://github.com/jonluca/vite-typescript-ssr-react]()
