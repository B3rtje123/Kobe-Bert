# enviroment files

## api

### .env (development)

Use firebase > Project settings > Service Accounts > Generate new private key

```env
GOOGLE_APPLICATION_CREDENTIALS=path-to-firebase-adminsdk-on-the-harddisk.json

DB_HOST="localhost"
DB_PORT="27028"
DB_NAME="api"

# WS_PORT="" //for socket.io
```

### .env.production.local (production)

```env
URL_FRONTEND=name-in-docker-compose:internal-port
DB_HOST=name-in-docker-compose
DB_PORT=internal-port
DB_NAME=name-in-environment-in-docker-compose

# WS_PORT="" //for socket.io

NODE_ENV="production"
```

## PWA

### .env (development)

Use firebase > Project settings > General > SDK setup and configuration > Config, and convert manual to a env syntax

```env
VITE_apiKey=""
VITE_authDomain=""
VITE_projectId=""
VITE_storageBucket=""
VITE_messagingSenderId=""
VITE_appId=""
```

### .env.production.local (production)

copy from .env (development) and add the next line

```env
VITE_BACKEND_URL=name-in-docker-compose:internal-port
```
