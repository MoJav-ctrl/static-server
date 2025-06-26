# Efficient Static File Server

A high-performance, secure static file server built with Node.js and Express, designed for hosting portfolios, marketing pages, documentation sites, and small business websites.

## Features

- **High Performance**: Compression, caching, and efficient static file serving
- **Security**: Helmet middleware with strict CSP and other security headers
- **Simple Deployment**: Just drop your files in the `public` folder
- **Tested**: Comprehensive test suite for reliability

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Add your static files to the `public` directory
4. Start the server: `npm start`

For development with auto-restart: `npm run dev`

## Configuration

Environment variables:
- `PORT`: Set the server port (default: 3000)

## Testing

Run tests with: `npm test`

## Deployment

This server is ready for deployment to platforms like:
- Heroku
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Railway
- Or any Node.js hosting environment

## Best Practices

1. Pre-compress your assets with gzip and brotli for best performance
2. Name compressed files with `.gz` and `.br` extensions (e.g., `style.css.gz`)
3. Include a `404.html` in your public folder for custom 404 pages
