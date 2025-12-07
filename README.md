# AI Newscaster

## Demo Link: https://www.youtube.com/watch?v=XFY5GU1F7nc

A voice-powered AI assistant that delivers personalized news and integrates with X (Twitter). Call in via phone and interact with your X account hands-free.

## Features

- **Voice Calls**: Call a phone number to interact with an AI that reads news and manages your X account
- **X Integration**: Get your timeline, read DMs, send messages, and post tweets via voice commands
- **Live Transcripts**: View real-time conversation transcripts in the web dashboard
- **OAuth Authentication**: Secure X account linking with OAuth 2.0 PKCE flow

## Architecture

```
+----------+     +----------+     +--------------+     +----------+
|  Phone   |---->|  Twilio  |---->| Voice Server |---->|   xAI    |
|  Call    |<----|          |<----|  (Node.js)   |<----| Realtime |
+----------+     +----------+     +------+-------+     +----------+
                                         |
                 +-----------------------+-----------------------+
                 |                       |                       |
          +------v------+        +-------v-------+        +------v------+
          |   Django    |        |   SvelteKit   |        |   X API     |
          |   Backend   |<------>|   Frontend    |        |             |
          |   (Auth)    |        |  (Dashboard)  |        |             |
          +-------------+        +---------------+        +-------------+
```

## Tech Stack

### Backend (Django)
- Django 4.2+ / Django REST Framework
- X OAuth 2.0 PKCE authentication
- SQLite database (development)
- Fernet token encryption

### Frontend (SvelteKit)
- Svelte 5 with runes
- TypeScript
- Tailwind CSS
- shadcn-svelte UI components

### Voice Server (Node.js)
- Located in separate repo: `xai-voice-examples-main`
- Twilio Media Streams integration
- xAI Realtime Voice API

## Prerequisites

- Python 3.10+
- Node.js 18+
- X Developer Account (for OAuth credentials)
- Twilio Account (for phone number)
- xAI API Key

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-newscaster
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env
```

Edit `backend/.env`:

```env
# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# X OAuth 2.0 (from X Developer Portal)
X_CLIENT_ID=your-x-client-id
X_CLIENT_SECRET=your-x-client-secret
X_REDIRECT_URI=http://localhost:8000/api/auth/x/callback

# Token encryption (generate with the command below)
# python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
ENCRYPTION_KEY=your-fernet-key

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### 4. Voice Server Setup

See the [xai-voice-examples-main](https://github.com/mylesgamez/xai-voice-agent) repository for voice server setup.

## Project Structure

```
ai-newscaster/
|-- backend/
|   |-- config/              # Django project settings
|   |-- users/               # User management & conversations
|   |   |-- models.py        # User, Conversation, Message models
|   |   |-- views.py         # API endpoints
|   |   +-- serializers.py   # DRF serializers
|   |-- x_auth/              # X OAuth integration
|   |   |-- views.py         # OAuth flow handlers
|   |   +-- encryption.py    # Token encryption utilities
|   |-- manage.py
|   +-- requirements.txt
|-- frontend/
|   |-- src/
|   |   |-- lib/
|   |   |   |-- api.ts       # Backend API client
|   |   |   |-- stores/      # Svelte stores (auth)
|   |   |   +-- components/  # UI components
|   |   +-- routes/
|   |       |-- +layout.svelte
|   |       |-- chats/       # Conversation pages
|   |       +-- profile/     # Setup/profile page
|   |-- package.json
|   +-- tailwind.config.ts
+-- .gitignore
```

## API Endpoints

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/x/start` | GET | Initiate X OAuth flow |
| `/api/auth/x/callback` | GET | OAuth callback handler |
| `/api/auth/status` | GET | Check auth status |

### Users & Conversations

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users/by-phone/` | GET | Get user by phone number |
| `/api/users/<id>/oauth-token/` | GET | Get encrypted OAuth token |
| `/api/conversations/` | GET/POST | List/create conversations |
| `/api/conversations/<id>/` | GET/PATCH | Get/update conversation |
| `/api/conversations/<id>/messages/` | POST | Add message to conversation |

## X Developer Portal Setup

1. Go to [developer.x.com](https://developer.x.com)
2. Create a new project and app
3. Enable OAuth 2.0 with PKCE
4. Set callback URL: `http://localhost:8000/api/auth/x/callback`
5. Request the following scopes:
   - `tweet.read`
   - `tweet.write`
   - `users.read`
   - `dm.read`
   - `dm.write`
   - `follows.read`

## Usage

1. Open the web app at `http://localhost:5173`
2. Go to **Setup** and enter your phone number
3. Click **Connect with X** to link your X account
4. Call the AI Newscaster phone number
5. Try commands like:
   - "What's on my timeline?"
   - "Read my DMs"
   - "Send a DM to @username saying hello"
   - "Tweet: Just tried AI Newscaster!"

## Development

### Running Tests

```bash
# Backend
cd backend
python manage.py test

# Frontend
cd frontend
npm run build  # Type checking via build
```

### Database Reset

```bash
cd backend
rm db.sqlite3
python manage.py migrate
```

## License

MIT
