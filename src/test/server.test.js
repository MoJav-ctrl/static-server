const request = require('supertest');
const app = require('../app');
const path = require('path');
const fs = require('fs');

// Create a test public directory with sample files
const testPublicDir = path.join(__dirname, '../../public');
beforeAll(() => {
  if (!fs.existsSync(testPublicDir)) {
    fs.mkdirSync(testPublicDir);
  }
  
  // Create sample files for testing
  fs.writeFileSync(path.join(testPublicDir, 'index.html'), '<html><body>Test</body></html>');
  fs.writeFileSync(path.join(testPublicDir, 'style.css'), 'body { color: red; }');
  fs.writeFileSync(path.join(testPublicDir, 'app.js'), 'console.log("test");');
});

describe('Static File Server', () => {
  it('should serve HTML files', async () => {
    const response = await request(app).get('/index.html');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
    expect(response.text).toContain('<html>');
  });

  it('should serve CSS files', async () => {
    const response = await request(app).get('/style.css');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/css/);
    expect(response.text).toContain('color: red');
  });

  it('should serve JS files', async () => {
    const response = await request(app).get('/app.js');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/javascript/);
    expect(response.text).toContain('console.log');
  });

  it('should return 404 for non-existent files', async () => {
    const response = await request(app).get('/nonexistent.html');
    expect(response.status).toBe(404);
  });

  it('should have security headers', async () => {
    const response = await request(app).get('/index.html');
    expect(response.headers['x-powered-by']).toBeUndefined();
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-frame-options']).toBe('DENY');
  });
});

// Clean up after tests
afterAll(() => {
  fs.rmSync(testPublicDir, { recursive: true, force: true });
});
