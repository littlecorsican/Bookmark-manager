# Bookmark Manager

A modern, feature-rich bookmark management application built with Next.js, TypeScript, and Prisma.

## Features

- 📚 **Bookmark Management**: Add, edit, delete, and organize bookmarks
- 🏷️ **Tag System**: Categorize bookmarks with custom tags
- 🔍 **Advanced Search**: Search by title, description, URL, and tags
- 📊 **Analytics**: Track visit counts and last visited dates
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Multiple Views**: List and card view modes
- 📤 **Export/Import**: Export bookmarks to CSV and import from CSV
- ⚡ **Fast Performance**: Optimized with Next.js and SWR
- 🔒 **Type Safety**: Full TypeScript support

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **State Management**: SWR for data fetching
- **Icons**: Lucide React
- **Validation**: Zod
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookmark-manager
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the `.env.local` file with your configuration:
   ```env
   DATABASE_URL="file:./prisma/db.sqlite"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Set up the database**
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm prisma studio` - Open Prisma Studio
- `pnpm prisma generate` - Generate Prisma client
- `pnpm prisma db push` - Push schema changes to database

### Project Structure

```
apps/bookmark-manager/
├── app/
│   ├── api/                 # API routes
│   ├── components/          # React components
│   ├── functions/           # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── Dockerfile             # Docker configuration
```

### Database Schema

The application uses a simple but effective schema:

- **Bookmarks**: Store bookmark data with title, URL, description, and visit tracking
- **Tags**: Organize bookmarks with custom tags
- **Relations**: Many-to-many relationship between bookmarks and tags

## Deployment

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t bookmark-manager .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 bookmark-manager
   ```

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your app

### Environment Variables

- `DATABASE_URL` - Database connection string
- `NEXTAUTH_SECRET` - Secret key for authentication (if using)
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Recent Improvements

- ✅ **Database Optimization**: Added indexes for better query performance
- ✅ **Error Handling**: Improved error boundaries and API error handling
- ✅ **Type Safety**: Enhanced TypeScript types and validation
- ✅ **Performance**: Optimized database connections and component rendering
- ✅ **Search Enhancement**: Advanced search with filters
- ✅ **Export/Import**: Fixed CSV export and import functionality
- ✅ **Pagination**: Added proper pagination controls
- ✅ **Security**: Input validation and sanitization
- ✅ **Docker**: Improved production Docker configuration
- ✅ **Loading States**: Added skeleton loading components

## Roadmap

- [ ] User authentication and authorization
- [ ] Bookmark folders/categories
- [ ] Browser extension integration
- [ ] Mobile app
- [ ] Advanced analytics and insights
- [ ] Social sharing features
- [ ] API rate limiting
- [ ] Automated backups
