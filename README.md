# 🚀 Professional Business Website

A complete full-stack business website with admin panel, contact form, image gallery, and services showcase.

## ✨ Features

### Frontend
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎨 **Beautiful Design** - Modern UI with smooth animations
- 🖼️ **Image Gallery** - Filterable portfolio showcase
- 💼 **Services Section** - Display your business services
- 📧 **Contact Form** - With email notifications
- 🌙 **Professional Theme** - Gold & dark blue luxury design

### Backend
- 🔐 **Admin Authentication** - Secure JWT-based login
- 📊 **Dashboard** - View statistics and analytics
- 💬 **Message Management** - View, reply, and manage inquiries
- 📈 **Real-time Stats** - Track new contacts and messages
- 🛡️ **Security** - Rate limiting, input validation
- 📧 **Email Service** - Automated email notifications

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Custom animations and effects
- Responsive grid layouts

### Backend
- Node.js
- Express.js
- SQLite Database
- JWT Authentication
- Nodemailer (Email)
- bcryptjs (Password hashing)
- Express Rate Limit (Security)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd business-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=3000
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourbrand.com
```

4. **Create data directory**
```bash
mkdir data
```

5. **Start the server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

6. **Access the website**
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

## 🔑 Default Admin Credentials

```
Username: admin
Password: admin123
```

⚠️ **IMPORTANT**: Change these credentials immediately after first login!

## 📁 Project Structure

```
business-website/
├── public/                 # Frontend files
│   ├── index.html         # Main homepage
│   ├── admin.html         # Admin dashboard
│   ├── styles.css         # Stylesheet
│   └── script.js          # JavaScript
├── data/                  # Database directory
│   └── business.db        # SQLite database (auto-created)
├── server.js              # Express server
├── database.js            # Database module
├── auth.js                # Authentication module
├── emailService.js        # Email service
├── rateLimiter.js         # Rate limiting
├── package.json           # Dependencies
├── .env.example           # Environment template
└── README.md              # This file
```

## 🎯 API Endpoints

### Public Endpoints

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "service": "Web Development",
  "message": "I need a website"
}
```

### Admin Endpoints (Require Authentication)

#### Login
```http
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### Get All Contacts
```http
GET /api/admin/contacts
Authorization: Bearer <token>
```

#### Get Single Contact
```http
GET /api/admin/contacts/:id
Authorization: Bearer <token>
```

#### Update Contact Status
```http
PATCH /api/admin/contacts/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "read"
}
```

#### Delete Contact
```http
DELETE /api/admin/contacts/:id
Authorization: Bearer <token>
```

#### Get Dashboard Stats
```http
GET /api/admin/stats
Authorization: Bearer <token>
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - Prevent abuse and DDoS
- **Input Validation** - Sanitize all user inputs
- **CORS Protection** - Cross-origin security
- **SQL Injection Prevention** - Parameterized queries

## 📧 Email Configuration

### Using Gmail

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → App passwords
   - Generate a new app password
3. Use this app password in `.env` file

### Using Other SMTP Services

Update these in `.env`:
```env
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
```

## 🚀 Deployment

### Deploy to Heroku

1. Install Heroku CLI
2. Create new Heroku app
```bash
heroku create your-app-name
```

3. Set environment variables
```bash
heroku config:set JWT_SECRET=your-secret
heroku config:set SMTP_USER=your-email
# ... set all variables
```

4. Deploy
```bash
git push heroku main
```

### Deploy to Railway/Render

1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically

### Deploy to VPS

1. SSH into your server
2. Install Node.js
3. Clone repository
4. Install dependencies
5. Use PM2 for process management
```bash
npm install -g pm2
pm2 start server.js --name business-website
pm2 save
pm2 startup
```

## 🎨 Customization

### Change Colors

Edit `styles.css`:
```css
:root {
    --primary-color: #d4af37;  /* Gold */
    --secondary-color: #1a1a2e; /* Dark blue */
    --accent-color: #e94560;    /* Red accent */
}
```

### Change Company Info

Edit in `index.html`:
- Company name
- Contact details
- Social media links
- Services offered

### Add More Services

Edit the services section in `index.html`:
```html
<div class="service-card">
    <div class="service-icon">
        <!-- SVG icon -->
    </div>
    <h3>Your Service</h3>
    <p>Description</p>
</div>
```

## 📝 Database Schema

### Contacts Table
```sql
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT)
- phone (TEXT)
- service (TEXT)
- message (TEXT)
- ip_address (TEXT)
- user_agent (TEXT)
- status (TEXT: 'new', 'read', 'replied', 'archived')
- created_at (DATETIME)
- updated_at (DATETIME)
```

### Admin Users Table
```sql
- id (INTEGER PRIMARY KEY)
- username (TEXT UNIQUE)
- password_hash (TEXT)
- email (TEXT UNIQUE)
- role (TEXT)
- last_login (DATETIME)
- created_at (DATETIME)
```

## 🐛 Troubleshooting

### Database not creating?
```bash
mkdir data
chmod 755 data
```

### Port already in use?
Change PORT in `.env` file

### Emails not sending?
- Check SMTP credentials
- Enable "Less secure apps" or use App Password
- Check firewall/network settings

### Admin login not working?
Database might not be initialized. Delete `data/business.db` and restart server.

## 📞 Support

For issues and questions:
- Email: admin@yourbrand.com
- GitHub Issues: [Create an issue]

## 📄 License

MIT License - feel free to use this project for your business!

## 🙏 Credits

Created with ❤️ by YourBrand Team

---

**हिंदी में मदद:**

यह एक पूर्ण व्यवसाय वेबसाइट है जिसमें:
- ✅ संपर्क फॉर्म
- ✅ इमेज गैलरी
- ✅ सेवाओं की सूची
- ✅ एडमिन पैनल

**शुरू करने के लिए:**
1. `npm install` चलाएं
2. `.env` फ़ाइल बनाएं
3. `npm start` चलाएं
4. http://localhost:3000 पर जाएं

**एडमिन पैनल:**
- यूज़रनेम: admin
- पासवर्ड: admin123

किसी भी समस्या के लिए संपर्क करें! 🚀
