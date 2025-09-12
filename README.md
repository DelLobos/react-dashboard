# Patient Medical Dashboard

A modern patient medical dashboard built as a coding challenge. This application allows healthcare professionals to view comprehensive patient information in an intuitive interface.

**Created by:** Eric Luttenegger  
**Project Type:** Coding Challenge - Given the designs, tasked to code and add functionality

🌐 **[Live Demo](https://dellobos.github.io/react-dashboard/)**

## 🏥 About This Project

This patient medical dashboard provides healthcare professionals with a comprehensive view of patient information. Users can click on any patient from the patient list to view detailed medical information including diagnosis history, diagnostic status, lab results, and personal information.

## ⚡ Tech Stack

- **React** - UI library for building interactive interfaces
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript for better development experience
- **SCSS** - Enhanced CSS with variables, nesting, and mixins
- **React Router** - Client-side routing for navigation

## 🔋 Features

- **Patient Selection** - Click on any patient to view their detailed information
- **Diagnosis History** - View vital signs including:
  - Blood pressure readings with trend indicators
  - Temperature measurements
  - Respiratory rate monitoring
  - Visual indicators for above/below average values
- **Diagnostic List** - Current health problems and their status
- **Lab Results** - Comprehensive laboratory test results
- **Patient Information** - Complete patient profile including:
  - Age, gender, and contact information
  - Insurance provider details
  - Patient photo
- **Responsive Design** - Optimized for desktop and tablet devices
- **Mock API Integration** - Uses mock data for demonstration and stability

## � Device Support

- ✅ **Desktop** - Full functionality and optimized layout
- ✅ **Tablet** - Responsive design adapted for tablet screens
- ⚠️ **Mobile** - Not optimized (due to condensed information requirements)

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine (version 16 or higher recommended).

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd patient-medical-dashboard
```

2. Install the dependencies:
```bash
npm install
```

### Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## 🏗️ Building for Production

Create a production build:

```bash
npm run build
```

## 🐳 Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t patient-dashboard .

# Run the container
docker run -p 3000:3000 patient-dashboard
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## 🎨 Styling

This project uses SCSS for styling, providing enhanced CSS capabilities including variables, nesting, and mixins for maintainable stylesheets.

## 📊 Data Source

The application uses a mock API for demonstration purposes, ensuring stability and consistent data for showcasing the dashboard's capabilities.

---

**Portfolio Project** - Showcasing modern React development skills and responsive design principles.
