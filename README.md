# Inventory Management Application

## Overview
The Inventory Management Application helps businesses track, manage, and optimize their inventory levels. It is designed to streamline stock control, minimize overstocking, and prevent stockouts for businesses of all sizes.

---

## Features

- **Product Management**:
  - Add, edit, and delete product details.
  - Categorize products by type, brand, or other attributes.
- **Inventory Tracking**:
  - Monitor stock levels in real-time.
  - Receive low-stock alerts.
- **Supplier Management**:
  - Maintain supplier details
  - Supplier Details Mobile Email
- **Responsive Design**:
  - Optimized for desktop, tablet, and mobile devices.

---

## Technology Stack

- **Frontend**:
  - Framework: React.js
  - Styling: Material UI

- **Backend**:
  - Framework: Node.js with Express.js
  - Database: MongoDB

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pawarchandrakant29/Inventory-Management.git
   cd Inventory-Management
   ```

2. Install dependencies for the backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Include the following variables:
     ```env
     PORT=5000
     DATABASE_URL=your_mongodb_connection_string
     ```

4. Run the application:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm run dev
     ```

5. Open the app in your browser at `http://localhost:5173`.

---
