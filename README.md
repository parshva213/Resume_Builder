# ResumeBuilder - Professional Resume Creator

A modern, responsive resume builder with real-time preview, multiple templates, and user authentication.

## Features

- 🎨 **Multiple Templates**: Professional, Modern, and Creative resume templates
- 🎨 **Custom Colors**: RGBA color picker for personalized themes
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🔐 **User Authentication**: Secure signup/login with PostgreSQL
- 💾 **Save & Load**: Save multiple resumes per user
- 📄 **PDF Export**: Download resumes as PDF files
- 🌙 **Dark/Light Theme**: Toggle between themes
- ⚡ **Real-time Preview**: Live preview as you type

## Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Vite
- React Router
- Lucide React Icons

### Backend
- Node.js + Express
- PostgreSQL
- bcrypt for password hashing
- CORS enabled

## Quick Start

### 1. Database Setup
```bash
# Run the database setup script
powershell -ExecutionPolicy Bypass -File scripts/setup-database.ps1
```

### 2. Backend Setup
```bash
# Install server dependencies
cd server
npm install

# Start the API server
npm start
```
Server runs on: http://localhost:3001

### 3. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```
App runs on: http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/signup` - Create new account
- `POST /api/login` - User login

### Resumes
- `GET /api/resumes/:userId` - Get user's resumes
- `POST /api/resumes` - Save new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Resumes Table
```sql
CREATE TABLE resumes (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Environment Variables

Create `.env` file in the root directory:
```env
VITE_PDFLAYER_KEY=your_pdflayer_api_key
```

Server environment variables (optional):
```env
PGUSER=postgres
PGHOST=localhost
PGDATABASE=reactra
PGPASSWORD=PARSHVAshah
PGPORT=2103
PORT=3001
```

## Project Structure

```
craftify-resumes-74/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── context/            # React context
│   ├── utils/              # Utility functions
│   └── lib/                # Library files
├── server/                 # Backend API
│   ├── server.js           # Express server
│   ├── package.json        # Server dependencies
│   └── database.sql        # Database schema
├── scripts/                # Setup scripts
└── public/                 # Static assets
```

## Usage

1. **Sign Up**: Create a new account with email and password
2. **Login**: Sign in to access your resumes
3. **Create Resume**: Fill in your information in the form
4. **Customize**: Choose template and colors
5. **Preview**: See real-time preview of your resume
6. **Save**: Save your resume to your account
7. **Download**: Export as PDF

## Error Handling

The application includes comprehensive error handling:
- Form validation (client-side)
- API error responses
- Network error handling
- User-friendly error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.