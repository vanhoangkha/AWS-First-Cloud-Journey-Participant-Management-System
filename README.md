# AWS First Cloud Journey - Participant Management System

<div align="center">

![AWS FCJ Logo](https://img.shields.io/badge/AWS-First%20Cloud%20Journey-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

*A modern, responsive web application for managing participants in the AWS First Cloud Journey program*

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [Usage](#usage) • [API](#api) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

The AWS First Cloud Journey Participant Management System is a comprehensive web application designed to streamline the management of participants in AWS cloud learning programs. Built with modern web technologies, it provides an intuitive interface for administrators to manage participant data, track progress, and maintain program records.

### Key Highlights

- 🎨 **Modern UI/UX** - Clean, responsive design with AWS-inspired styling
- 🚀 **High Performance** - Optimized for speed and scalability
- 📱 **Mobile-First** - Fully responsive across all devices
- 🔒 **Secure** - Built with security best practices
- 🎯 **User-Friendly** - Intuitive interface for easy navigation
- 🔄 **Real-time** - Live updates and instant feedback

## ✨ Features

### 👥 Participant Management
- **Add Participants** - Easy-to-use forms with validation
- **Edit Information** - Update participant details seamlessly
- **View Profiles** - Comprehensive participant information display
- **Delete Records** - Safe deletion with confirmation dialogs

### 📊 Dashboard & Analytics
- **Statistics Overview** - Real-time participant counts and metrics
- **Status Tracking** - Monitor active/inactive participants
- **Search & Filter** - Quick participant lookup functionality
- **Export Data** - Download participant information in various formats

### 🎨 User Interface
- **Modern Design** - AWS-inspired color scheme and layout
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Interactive Elements** - Smooth animations and hover effects
- **Accessibility** - WCAG compliant for inclusive design

### 🔧 Technical Features
- **Demo Mode** - Built-in demo with sample data for testing
- **Form Validation** - Client-side and server-side validation
- **Error Handling** - Comprehensive error management
- **Loading States** - Visual feedback during operations
- **Auto-save** - Prevent data loss with automatic saving

## 🎬 Demo

### Screenshots

#### 1. Dashboard
![Dashboard](https://via.placeholder.com/800x400/232F3E/FF9900?text=Dashboard+View)
*Modern dashboard with participant statistics and quick actions*

#### 2. Participant List
![Participant List](https://via.placeholder.com/800x400/232F3E/FF9900?text=Participant+List)
*Comprehensive table view with search and filter capabilities*

#### 3. Add Participant
![Add Participant](https://via.placeholder.com/800x400/232F3E/FF9900?text=Add+Participant+Form)
*Clean, validated form for adding new participants*

#### 4. Participant Profile
![Participant Profile](https://via.placeholder.com/800x400/232F3E/FF9900?text=Participant+Profile)
*Detailed participant information with action buttons*

### Live Demo
🌐 **[Try the Live Demo](http://localhost:3333)** (when running locally)

## 🛠 Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MySQL** - Relational database management system
- **Handlebars** - Template engine for dynamic content

### Frontend
- **Bootstrap 5** - CSS framework for responsive design
- **Bootstrap Icons** - Icon library
- **Custom CSS** - Modern styling with gradients and animations
- **Vanilla JavaScript** - Client-side interactivity

### Development Tools
- **Nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management
- **Git** - Version control system

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MySQL** (v8.0 or higher) - Optional for demo mode
- **Git** - For cloning the repository

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aws-fcj-management.git
   cd aws-fcj-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open your browser**
   ```
   http://localhost:3333
   ```

### Detailed Installation

#### Step 1: Clone and Setup
```bash
# Clone the repository
git clone https://github.com/your-username/aws-fcj-management.git
cd aws-fcj-management

# Install dependencies
npm install
```

#### Step 2: Database Setup (Optional)
If you want to use a real MySQL database instead of demo mode:

```sql
-- Create database
CREATE DATABASE lib;

-- Create user table
CREATE TABLE `lib`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `comments` TEXT NOT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;
```

#### Step 3: Environment Configuration
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3333

# Database Configuration (Optional - for real database)
DB_HOST=localhost
DB_NAME=lib
DB_USER=root
DB_PASS=your_password

# Application Settings
NODE_ENV=development
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `3333` | No |
| `DB_HOST` | MySQL host address | `localhost` | No* |
| `DB_NAME` | Database name | `lib` | No* |
| `DB_USER` | Database username | `root` | No* |
| `DB_PASS` | Database password | - | No* |
| `NODE_ENV` | Environment mode | `development` | No |

*Database variables are optional. The app will run in demo mode if database connection fails.

### Demo Mode

The application automatically switches to demo mode if it cannot connect to the MySQL database. Demo mode includes:

- 5 sample participants with realistic data
- Full CRUD operations (Create, Read, Update, Delete)
- All UI features and interactions
- Data persistence during the session

## 📖 Usage

### Starting the Application

```bash
# Development mode with auto-restart
npm start

# Production mode
npm run prod
```

### Basic Operations

#### Adding a Participant
1. Click the "Add Participant" button on the dashboard
2. Fill in the required information:
   - First Name (required)
   - Last Name (required)
   - Email Address (required, must be valid)
   - Phone Number (required)
   - Comments (optional)
3. Click "Add Participant" to save

#### Editing a Participant
1. Find the participant in the list
2. Click the "Edit" button (pencil icon)
3. Modify the information as needed
4. Click "Update Participant" to save changes

#### Viewing Participant Details
1. Click the "View" button (eye icon) next to any participant
2. Review all participant information
3. Use quick actions like "Copy Information" or "Export Data"

#### Deleting a Participant
1. Click the "Delete" button (trash icon)
2. Confirm the deletion in the dialog
3. The participant will be permanently removed

### Advanced Features

#### Search and Filter
- Use the search functionality to quickly find participants
- Filter by status, date, or other criteria
- Sort columns by clicking on headers

#### Data Export
- Export individual participant data as JSON
- Copy participant information to clipboard
- Generate reports for program management

## 🔌 API Endpoints

### Participant Management

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/` | Get all participants | - |
| `POST` | `/` | Search participants | `search` |
| `GET` | `/adduser` | Show add participant form | - |
| `POST` | `/adduser` | Create new participant | `first_name`, `last_name`, `email`, `phone`, `comments` |
| `GET` | `/edituser/:id` | Show edit participant form | `id` |
| `POST` | `/edituser/:id` | Update participant | `id`, `first_name`, `last_name`, `email`, `phone`, `comments` |
| `GET` | `/viewuser/:id` | View participant details | `id` |
| `GET` | `/:id` | Delete participant | `id` |

### Request/Response Examples

#### Create Participant
```bash
curl -X POST http://localhost:3333/adduser \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "first_name=John&last_name=Doe&email=john@example.com&phone=123-456-7890&comments=New participant"
```

#### Get All Participants
```bash
curl -X GET http://localhost:3333/
```

## 🗄️ Database Schema

### User Table Structure

```sql
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `comments` TEXT NOT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE = InnoDB;
```

### Sample Data

```sql
INSERT INTO `user` 
(`first_name`, `last_name`, `email`, `phone`, `comments`, `status`) VALUES
('Amanda', 'Nunes', 'anunes@example.com', '012345 678910', 'Professional participant', 'active'),
('Alexander', 'Volkanovski', 'avolkanovski@example.com', '012345 678911', 'Advanced learner', 'active'),
('Khabib', 'Nurmagomedov', 'knurmagomedov@example.com', '012345 678912', 'Cloud architecture focus', 'active');
```

## 📁 Project Structure

```
aws-fcj-management/
├── 📁 public/                 # Static assets
│   ├── 📁 css/               # Stylesheets
│   │   ├── main.css          # Legacy styles
│   │   ├── modern-ui.css     # Modern UI styles
│   │   └── cloudscape-custom.css # AWS Cloudscape styles
│   └── 📁 js/                # Client-side JavaScript
├── 📁 server/                # Server-side code
│   ├── 📁 controllers/       # Route controllers
│   │   ├── userController.js # Database operations
│   │   └── demoController.js # Demo mode operations
│   └── 📁 routes/            # Route definitions
│       ├── user.js           # Database routes
│       └── demo.js           # Demo routes
├── 📁 views/                 # Handlebars templates
│   ├── 📁 layouts/           # Layout templates
│   │   └── main.hbs          # Main layout
│   ├── 📁 partials/          # Reusable components
│   ├── home.hbs              # Dashboard page
│   ├── add-user.hbs          # Add participant form
│   ├── edit-user.hbs         # Edit participant form
│   └── view-user.hbs         # Participant details
├── 📄 app.js                 # Main application file
├── 📄 package.json           # Dependencies and scripts
├── 📄 .env                   # Environment variables
├── 📄 .gitignore             # Git ignore rules
└── 📄 README.md              # Project documentation
```

### Key Files Description

- **`app.js`** - Main Express application with middleware setup
- **`server/controllers/`** - Business logic and database operations
- **`server/routes/`** - Route definitions and middleware
- **`views/`** - Handlebars templates for UI rendering
- **`public/css/modern-ui.css`** - Main stylesheet with AWS-inspired design
- **`.env`** - Environment configuration (not in repository)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

### Code Style

- Use 2 spaces for indentation
- Use semicolons consistently
- Follow camelCase naming convention
- Keep functions small and focused
- Use meaningful variable names

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 🙏 Acknowledgments

- **AWS** - For inspiration and design guidelines
- **Bootstrap Team** - For the excellent CSS framework
- **Node.js Community** - For the robust runtime environment
- **Express.js Team** - For the minimalist web framework
- **Contributors** - For making this project better

## 📞 Support

If you need help or have questions:

- 📧 **Email**: support@aws-fcj-management.com
- 💬 **Issues**: [GitHub Issues](https://github.com/your-username/aws-fcj-management/issues)
- 📖 **Documentation**: [Wiki](https://github.com/your-username/aws-fcj-management/wiki)
- 🌐 **Website**: [Project Homepage](https://your-username.github.io/aws-fcj-management)

---

<div align="center">

**Made with ❤️ for the AWS Community**

[⬆ Back to Top](#aws-first-cloud-journey---participant-management-system)

</div>