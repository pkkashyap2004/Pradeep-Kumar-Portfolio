# shresthportfolio

A full stack portfolio website built with HTML, CSS, JavaScript, Node.js, Express, and MySQL. Features responsive design, animations, and MVC architecture.

## Features

- Responsive mobile design
- Smooth animations
- Navbar with navigation and social links
- Hero section
- About section
- Resume section
- Contact form with backend storage
- Location section with map
- Professional footer

## Tech Stack

- Frontend: HTML, CSS, JavaScript (MVC pattern)
- Backend: Node.js, Express
- Database: MySQL
- Animations: CSS animations and JavaScript

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up MySQL database:
   - Start MySQL service
   - Create database and user as per config/db.js

3. Run the server:
   ```bash
   npm start
   ```

4. Open http://localhost:3000 in your browser.

## Project Structure

- `public/` - Static files (HTML, CSS, JS)
- `models/` - Database models
- `controllers/` - Route handlers
- `config/` - Database configuration
- `server.js` - Main server file
