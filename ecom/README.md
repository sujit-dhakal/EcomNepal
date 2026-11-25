# EcomNepal

## Run locally with Docker

Docker and Docker Compose are required. The project includes development
defaults, so it can start without a `.env` file:

```bash
docker compose up --build
```

Open the storefront at <http://localhost:3000>, the Django API at
<http://localhost:8000>, and the chatbot API at <http://localhost:8080>.

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
