# Wohnheim Booking

Live: https://booking.mzeitz.de

A booking tool for the common room and grill area of a student dormitory. Users enter a name, pick a room, date and time range, and the app rejects overlapping bookings for the same room. Reservations whose date has passed are deleted when the start page is loaded.

## Stack

Node.js, Express 5, SQLite (better-sqlite3), EJS.

## Local setup

Requires Node.js 20 or newer (the Docker image uses Node 22).

```bash
npm ci
npm start
```

The app listens on http://localhost:3000. The SQLite file `wohnheim.db` is created in the project directory on first start. Optional environment variables are listed in `.env.example` (`PORT`, `DB_PATH`); the app reads them from the process environment and does not load `.env` files itself.

## Local setup with Docker

```bash
docker compose up --build -d
```

The app is then available at http://127.0.0.1:3000. The database is stored in the named volume `booking-data`, mounted at `/data` (`DB_PATH=/data/wohnheim.db`), so it survives container restarts and rebuilds.

## Deployment

The app first ran on Render. There the instance went to sleep and the database was lost. It is now self-hosted on a Hetzner VPS (Ubuntu) and runs as a Docker container via Docker Compose. Caddy acts as reverse proxy and obtains HTTPS certificates automatically from Let's Encrypt. The container port is bound to localhost only, so the app is reachable from outside only through Caddy. The SQLite database lives in a Docker volume, so it persists across restarts.

## Limitations

There is no authentication: anyone can create or delete reservations. There is no rate limiting and no input validation beyond the HTML form.
