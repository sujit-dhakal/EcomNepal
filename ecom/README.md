# EcomNepal

## Run locally with Docker

Docker and Docker Compose are required. The project includes development
defaults, so it can start without a `.env` file:

```bash
docker compose up --build
```

Open the storefront at <http://localhost:3000>, the Django API at
<http://localhost:8000>, and the chatbot API at <http://localhost:8080>.

To use a different host or IP address, copy `.env.sample` to `.env` and set
`NEXT_PUBLIC_API_URL` (and, if needed, `NEXT_PUBLIC_CHATBOT_API_URL`) to the
browser-accessible API URLs, including `http://` or `https://`. Set
`ALLOWED_HOSTS` to a comma-separated list of hostnames/IPs accepted by Django.
`CORS_ALLOW_ALL_ORIGINS=true` allows browser requests from any origin; set it
to `false` to disable that behavior.
The frontend container uses `API_INTERNAL_URL=http://django-app:8000` for
server-rendered requests; keep that Docker service URL when running with Compose.

For example, to access Django through a machine's LAN IP, set:

```dotenv
NEXT_PUBLIC_API_URL=http://192.168.1.50:8000
ALLOWED_HOSTS=localhost,127.0.0.1,192.168.1.50
```

Restart the Compose stack after changing `.env` so the frontend picks up the
new public API URL.

## Add the demo catalog

After the stack is running, seed the categories and products with:

```bash
./scripts/seed-products.sh
```

The command is safe to run repeatedly: it updates the same catalog products
and does not duplicate them. It does not delete or modify other products.

To configure PayPal or the chatbot, copy `.env.sample` to `.env` and fill in
`NEXT_PUBLIC_CLIENT_ID`, `CLIENT_ID`, `CLIENT_SECRET`, and/or `OPENAI_API_KEY`.

Stop the development stack with:

```bash
docker compose down
```
