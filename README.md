# 🔗 Shortify - URL Shortener

A modern, full-stack URL shortening application built with React and Node.js. Transform long URLs into short, shareable links with comprehensive analytics and QR code generation.

## 🌟 Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Analytics Dashboard**: Track clicks, geolocation, browser, and device data
- **QR Code Generation**: Create customizable QR codes for your shortened URLs
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Analytics**: Monitor link performance with detailed insights

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap** - CSS framework

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **nanoid** - URL-safe unique ID generator

## 📁 Project Structure

```
url-shortener/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── assets/            # Static assets
│   └── App.jsx            # Main App component
├── backend/               # Backend Node.js application
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   └── connect.js         # Database connection
├── public/                # Public assets
└── README.md
```

## 📊 Features Overview

### URL Shortening

- Duplicate URL detection
- Custom short URL generation
- Click tracking
- URL validation

### Analytics Dashboard

- Total clicks tracking
- Geographic data (country-based)
- Browser and device detection
- Timestamp tracking

### QR Code Generator

- Multiple formats (PNG, SVG, JPG)
- Customizable colors
- Frame options
- Logo integration
- Size adjustment

## 🔗 Links

- **Live Demo**: [View Live](#)
- **Repository**: [GitHub](https://github.com/itxAMaN23/url-shortener)
