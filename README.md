# Doodlw Chat Application 

A modern, accessible chat application built with Next.js 14, React, and TypeScript. Features a clean, performant UI with real-time message updates.

## Features

✨ **Modern UI/UX**
- Distinctive dark theme with gradient accents
- Smooth animations and transitions
- Mobile-responsive design
- Auto-scrolling to latest messages

🚀 **Performance**
- Next.js 14 App Router for optimal performance
- Optimized rendering with React Server Components
- Efficient message polling (3-second intervals)
- Automatic code splitting
- Fast load times


🔒 **Type Safety**
- Full TypeScript implementation
- Strict type checking
- Type-safe API calls

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **CSS Modules** - Scoped styling

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API running on `http://localhost:3000`

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-app-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure API**
   
   Create a `.env.local` file in the root:
   ```bash
   cp .env.example .env.local
   ```
   
   Update if needed:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
   NEXT_PUBLIC_AUTH_TOKEN=super-secret-doodle-token
   NEXT_PUBLIC_POLL_INTERVAL=3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   The app will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

To start the production server:
```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
doodle-chatapp/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── chat/page.tsx
│   └── globals.css
├── components/
│   └── chat.tsx
├── lib/
│   ├── api.ts
│   └── utils.ts
├── types/
│   └── index.ts
```

## Next.js Specific Features


### Client Components
The ChatApp component uses `'use client'` directive for client-side interactivity:
- Real-time updates
- Browser APIs (localStorage)

## API Integration

### GET Messages
```typescript
GET /api/v1/messages
Headers:
  Authorization: Bearer super-secret-doodle-token

Response:
{
  "messages": [
    {
      "_id": "r4325rf432",
      "message": "Hello",
      "author": "John Doe",
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ]
}
```

### POST Message
```typescript
POST /api/v1/messages
Headers:
  Authorization: Bearer super-secret-doodle-token
  Content-Type: application/json

Body:
{
  "message": "Hello",
  "author": "John Doe"
}
```

## Code Quality

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Architecture Highlights

### Clean Code Principles
- **Service Layer**: API logic separated from UI components
- **Type Safety**: Full TypeScript coverage with strict mode
- **Utility Functions**: Reusable helpers for common tasks
- **Error Handling**: Comprehensive try-catch blocks with user feedback


### Accessibility Features
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Focus management
- Color contrast compliance


### Environment Variables
Remember to set these in your deployment platform:
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_AUTH_TOKEN`
- `NEXT_PUBLIC_POLL_INTERVAL`


## Development Best Practices

### Commit Guidelines
This project follows atomic commit principles:
- Each commit does one thing
- Descriptive commit messages
- Feature branches for new functionality

### Code Style
- Consistent formatting
- Clear variable naming
- Comprehensive comments for complex logic
- TypeScript strict mode enabled

## Differences from Vite Version

1. **Framework**: Uses Next.js instead of Vite
2. **Routing**: App Router instead of React Router
3. **API Proxy**: Built-in Next.js rewrites
4. **Environment Variables**: `NEXT_PUBLIC_` prefix required
5. **Client Components**: Must use `'use client'` directive
6. **Build Output**: `.next` directory instead of `dist`

## Future Enhancements

Potential improvements for future iterations:
- [ ] Server-side rendering for initial messages
- [ ] API routes for backend integration
- [ ] WebSocket support via Next.js API routes
- [ ] Message editing and deletion
- [ ] User authentication with NextAuth
- [ ] File/image upload with Next.js Image component
- [ ] Real-time updates with Server-Sent Events
- [ ] Progressive Web App (PWA) capabilities
- [ ] Edge runtime for global performance

## Troubleshooting

### API Connection Issues
1. Ensure backend is running on port 3000
2. Check environment variables in `.env.local`
3. Verify auth token matches backend expectations
4. Check Next.js rewrites in browser DevTools

### Build Issues
1. Clear cache: `rm -rf .next node_modules && npm install`
2. Update dependencies: `npm update`
3. Check TypeScript errors: `npm run type-check`

### Hydration Errors
If you see hydration warnings:
1. Ensure client-only code uses `'use client'`
2. Check for mismatched SSR/client HTML
3. Use `useEffect` for browser-only code

## License

MIT

