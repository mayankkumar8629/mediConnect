# mediConnect
# Healthcare Management System 🏥💊

A microservices-based platform connecting patients, hospitals, and pharmacies with MERN stack.

## 🌟 Key Features

### **User Service**
- 🏥 Browse hospitals with filters/sorting
- 📅 Book/cancel appointments
- 💊 Pharmacy finder with medicine availability check
- 📦 Order medicines from nearby pharmacies
- ✍️ Blog system (Read/Write)
- ⭐ Rate/review hospitals
- 👨‍⚕️ View doctor profiles

### **Hospital Admin Service**
- 👨‍⚕️ Doctor management (Add/Remove/Schedule)
- 📊 Patient records system
- 📆 Appointment management
- 💊 Medical inventory control
- 📈 Analytics dashboard
- 💰 Transaction monitoring

### **Super Admin Service**
- 👥 User management (CRUD)
- 🏥 Hospital onboarding
- 📊 Global analytics
- ⚙️ System configuration
- 🔐 Role-based access control

### **API Gateway**
- 🔗 Single entry point for all services
- 🔐 Authentication/Authorization
- ⚡ Request routing & load balancing
- 📊 API analytics

## 🛠️ Tech Stack


### **Backend (Microservices)**
| Service           | Technology               |
|-------------------|--------------------------|
| API Gateway       | Express + Node.js        |
| User Service      | Node.js + Express        | 
| Hospital Service  | Node.js + Express        |
| Admin Service     | Node.js + Express        |
| Database          | MongoDB (Mongoose)       |




















┌───────────────────┐
│      Client       │
│     (React)       │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│    API Gateway    │
└───────┬─┬─┬───────┘
        │ │ │        
  ┌─────↓ ↓ ↓─────┐  
  │               │  
  ▼               ▼  
┌───────┐     ┌───────┐     ┌───────┐
│ User  │     │Hospital│     │ Admin │
│Service│     │Service │     │Service│
└───▲───┘     └───▲───┘     └───▲───┘
    │             │             │
    └───────┬─────┴───────┬─────┘
            │             │
      ┌─────▼─────────────▼─────┐
      │                         │
      │     SINGLE MONGODB      │
      │                         │
      └─────────────────────────┘
























## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/healthcare-system.git

# Setup individual services
cd api-gateway && npm install
cd ../user-service && npm install
# Repeat for other services

# Environment setup
Create .env files in each service following .env.example