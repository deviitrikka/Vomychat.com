# **🌳 Linktree Clone **  

![Linktree Clone](https://your-image-url.com)  
*A full-stack Linktree clone with user authentication, referral tracking, and interactive UI.*  

---

## **📌 Features**
✅ **User Registration & Authentication** (JWT)  
✅ **Login with Email/Username & Secure Password Hashing**  
✅ **Referral System** (Track successful sign-ups & referral statistics)  
✅ **Password Reset System** (Token-based email verification)  
✅ **Interactive Dashboard** (Referral stats & referred users display dynamically)  
✅ **Mobile Responsive UI** (Optimized for all devices)  

---

## **🚀 Tech Stack**
**Frontend:** Next.js (React), Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB (Atlas)  
**Authentication:** JWT (JSON Web Token), bcrypt  
**Database ORM:** Mongoose  
**Styling:** Tailwind CSS  

---

## **📂 Folder Structure**
```
📂 linktree-clone
 ├── 📁 frontend (Next.js)
 │   ├── 📁 app
 │   │   ├── 📄 page.js  (Home)
 │   │   ├── 📄 login.js (Login Page)
 │   │   ├── 📄 signup.js (Signup Page)
 │   │   ├── 📄 dashboard.js (User Dashboard)
 │   │   ├── 📄 referral-stats.js (Referral Statistics Page)
 │   │   ├── 📄 referrals.js (Referred Users Page)
 │   │   ├── 📁 components
 │   │   │   ├── 📄 Navbar.js
 │   │   │   ├── 📄 Footer.js
 │   │   ├── 📁 styles
 │   │   │   ├── 📄 globals.css
 ├── 📁 backend (Express.js)
 │   ├── 📁 models
 │   │   ├── 📄 User.js  (Mongoose User Schema)
 │   ├── 📁 routes
 │   │   ├── 📄 auth.js  (Login, Register, Forgot Password)
 │   │   ├── 📄 referrals.js (Referral Stats & Tracking)
 │   ├── 📁 middleware
 │   │   ├── 📄 authMiddleware.js (JWT Token Authentication)
 │   ├── 📄 server.js (Main Express App)
 ├── 📄 .env (Environment Variables)
 ├── 📄 package.json (Dependencies)
 ├── 📄 README.md (This File)
```

---

## **🛠 Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/linktree-clone.git
cd linktree-clone
```

### **2️⃣ Install Dependencies**
#### **Frontend**
```sh
cd frontend
npm install
```

#### **Backend**
```sh
cd backend
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file inside the **backend** folder and add:
```env
MONGO_URI=your_mongodb_connection_url
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## **🚀 Running the Project**
### **1️⃣ Start the Backend**
```sh
cd backend
npm start
```

### **2️⃣ Start the Frontend**
```sh
cd frontend
npm run dev
```
📌 **Now visit** `http://localhost:3000` **to use the app!** 🎉  

---

## **📝 API Endpoints**
### **📌 Authentication (JWT)**
| Method | Endpoint            | Description          | Protected? |
|--------|---------------------|----------------------|------------|
| POST   | `/api/auth/register`  | Register new user  | ❌ No       |
| POST   | `/api/auth/login`     | Login user & get JWT | ❌ No       |
| POST   | `/api/auth/forgot-password` | Send password reset email | ❌ No  |
| POST   | `/api/auth/reset-password/:token` | Reset password with token | ❌ No |

### **📌 Referral System**
| Method | Endpoint            | Description                     | Protected? |
|--------|---------------------|---------------------------------|------------|
| GET    | `/api/referrals/referral-stats`  | Fetch total successful referrals | ✅ Yes  |
| GET    | `/api/referrals/referrals`       | List users referred by logged-in user | ✅ Yes |

---

## **🎨 UI Preview**
📌 **Home Page**  
![Home Page](https://your-image-url.com)  

📌 **Dashboard (Referral Stats & Users)**  
![Dashboard](https://your-image-url.com)  

📌 **Signup / Login**  
![Signup/Login](https://your-image-url.com)  

---

## **💡 Features Breakdown**
### **1️⃣ User Authentication & Security**
🔹 Secure **password hashing** with `bcrypt.js`  
🔹 **JWT-based authentication** for secure access  
🔹 **Forgot Password & Email Reset System**  

### **2️⃣ Referral System**
🔹 **Each user gets a unique referral link**  
🔹 **Referred users are tracked in MongoDB**  
🔹 **Admin can track referral statistics**  

### **3️⃣ Dynamic UI & Mobile-Friendly**
🔹 **Navbar updates based on authentication state**  
🔹 **Displays referral data dynamically (without refresh)**  
🔹 **Fully responsive using Tailwind CSS**  

---

## **📢 Contributing**
Want to improve this project? Follow these steps:
1. **Fork the repo**  
2. **Create a new branch** (`git checkout -b feature-branch`)  
3. **Commit your changes** (`git commit -m "Added new feature"`)  
4. **Push to GitHub** (`git push origin feature-branch`)  
5. **Create a Pull Request (PR)**  

---

## **📌 License**
📜 MIT License. Feel free to modify & use the code.

---

### **🚀 Developed by [Your Name](https://github.com/yourusername)**
Give this project a ⭐ on [GitHub](https://github.com/yourusername/linktree-clone) if you like it! 🚀🔥  
Let me know if you need any modifications! 😊