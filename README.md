# Andhra PG | Premium Student Hostel & Homely Mess Web Application

A modern, responsive web application for **"Andhra PG"** tailored for college students and PG/Hostel owners. Features real-time bed vacancy tracking, authentic Andhra weekly food menu, transparent rent pricing, direct WhatsApp/phone contact, and a dedicated PG Owner Management Portal.

---

## 🚀 How to Run the Application

The application is built with **React + Vite** and is already running locally!

### 1. Quick Access (If dev server is running)
Open your browser and navigate to:
```
http://localhost:5173/
```

### 2. Standard Start from Terminal
If the terminal is closed, you can run:

```bash
# Navigate to the project directory
cd "c:\Mess application"

# Install dependencies (already installed)
npm install

# Start the development server
npm run dev
```

Once started, open `http://localhost:5173/` in any browser (Chrome, Edge, Firefox, or Mobile Browser).

---

## 🌟 Key Features & User Roles

### 🎓 1. Student / User Mode
- **Real-Time Bed Vacancy Matrix:**
  - Visual floor-by-floor layout (Ground, 1st, 2nd, 3rd Floor & Rooftop).
  - Individual interactive bed slots (**🟢 Vacant / Available** vs **🔴 Occupied**).
  - Filter rooms by sharing type (Single Deluxe, 2-Sharing, 3-Sharing, 4-Sharing), AC / Non-AC, and floor.
- **Authentic Andhra Mess Weekly Menu:**
  - Day-by-day selector (Monday – Sunday) with automatic detection of current day.
  - Authentic Telugu dishes: Gongura Pappu, Pure Ghee, Sona Masoori Rice, Avakaya, Wednesday Spicy Chicken Curry, and Sunday Grand Chicken Dum Biryani feast.
  - Early morning college lunch box packing schedule (7:45 AM).
- **Transparent Rent & Policies:**
  - AC and Non-AC comparison toggle.
  - 100% refundable security deposit breakdown and zero brokerage.
  - Clear electricity policy (sub-meter per AC, lights/fans free).
- **Schedule Free PG Visit Pass:**
  - Interactive booking modal with automatic pass generation (e.g., `APG-VISIT-8492`).
  - 1-click button to share the visit pass directly with the owner on WhatsApp.
- **Direct Owner Connect:**
  - 1-click **WhatsApp Chat** with pre-filled room inquiry message.
  - 1-click **Direct Phone Call** to warden `+91 98480 22338`.
  - Google Maps location button & hostel code of conduct / gate timings.

---

### 🏢 2. PG / Hostel Owner Management Portal
Click the **"Owner Portal"** button in the top navigation bar to access:
- **Operations Dashboard:**
  - Total bed capacity, real-time vacant beds, occupied beds, and occupancy rate (%).
  - Projected monthly rent collections computed automatically from occupied beds.
- **Bed Vacancy Controller:**
  - One-click toggle for any bed (Vacant 🟢 ↔ Occupied 🔴).
  - Bulk actions: "Mark Entire Room Full" or "Mark All Vacant".
  - Changes instantly sync to the student view via persistent state!
- **Rent & Pricing Manager:**
  - Edit monthly rent per bed for any room or sharing type.
- **Mess Menu Editor:**
  - Edit daily dishes for Breakfast, Lunch, Evening Snacks, and Dinner for each day of the week.
- **Student Inquiries & Leads Manager:**
  - View all student visit bookings submitted through the site.
  - 1-click direct WhatsApp button to reply to students.
  - Update lead status (`New`, `Contacted`, `Visit Scheduled`, `Joined PG`).
- **Hostel Settings:**
  - Update owner name, phone number, WhatsApp number, gate timings, and address.

---

## 🛠️ Technology Stack
- **Frontend Framework:** React 19 + Vite
- **Styling:** Vanilla CSS with custom modern design system (dark mode, glassmorphism, responsive utilities)
- **Icons:** Lucide React
- **State Management:** React Context API with persistent `localStorage` synchronization
