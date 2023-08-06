# Websocket Adapter

A simple adapter for HTTP <=> Websocket.

## Build Setup

```bash
# install dependencies
$ pnpm install

# serve with hot reload at localhost:5001
$ pnpm run dev

# build for production and launch server
$ pnpm run build
$ pnpm run start
```

## Configuration

Configure the service with `.${APP_NAME}rc` file (_default:_ `.ws-adapterrc`). See `src/@types/config.ts` to see all available configurations.

```javascript
{
  "APP_PORT": 5001
}
```

## Security Vulnerabilities

If you discover a security vulnerability within Websocket Adapter, please send an e-mail to Gradiyanto Putera Husein at [gradiph@gmail.com](mailto:gradiph@gmail.com?subject=Found%20a%20Vulnerability%20in%20Project%20Github%2Fws-adapter&body=Hi.%20I%20found%20a%20vulnerability%20in%20your%20project%20at%20https%3A%2F%2Fgithub.com%2Fgradiph%2Fws-adapter%20which%20is%20%7Bplease_describe_here%7D.%0AThank%20you.). All security vulnerabilities will be promptly addressed.

## License

The Websocket Adapter is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
