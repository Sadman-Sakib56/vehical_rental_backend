# Vehicle Rental System Backend

A backend API for managing a vehicle rental system. This project allows admins to manage vehicles and users, while customers can book vehicles and manage their own bookings.

---

## Features

- **User Authentication & Authorization**
  - Signup & Signin with JWT authentication
  - Admin and Customer roles with role-based access control
- **Users Module**
  - Admin: view, update, delete any user
  - Customer: update own profile only
- **Vehicles Module**
  - Admin: create, update, delete vehicles
  - Public: view all vehicles or specific vehicle details
- **Bookings Module**
  - Customer: create bookings, cancel before start date
  - Admin: view all bookings, mark vehicles as returned
  - Automatic vehicle availability updates and booking status handling
- **Business Logic**
  - Total price calculated as `daily_rent_price × number_of_days`
  - Vehicle status automatically updates on booking/return/cancel
  - Prevent deletion of users or vehicles with active bookings

---

## Technology Stack

- **Backend:** Node.js, TypeScript
- **Web Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Database Pooling:** pg

---

## Project Structure

src/
├── config/
│ ├── db.ts
│ └── index.ts
├── modules/
│ ├── auth/
│ │ ├── auth.route.ts
│ │ └── auth.service.ts
│ ├── users/
│ │ ├── user.controller.ts
│ │ ├── user.route.ts
│ │ └── user.service.ts
│ ├── vehicles/
│ │ ├── vehicle.controller.ts
│ │ ├── vehicle.route.ts
│ │ └── vehicle.service.ts
│ └── bookings/
│ ├── booking.controller.ts
│ ├── booking.route.ts
│ └── booking.service.ts
├── middlewares/
│ └── auth.ts
└── server.ts



---

## API Endpoints

### **Auth**
| Method | Endpoint           | Access | Description                |
|--------|------------------|--------|----------------------------|
| POST   | /api/v1/auth/signup | Public | Register a new user        |
| POST   | /api/v1/auth/signin | Public | Login and receive JWT      |

### **Users**
| Method | Endpoint             | Access        | Description                               |
|--------|--------------------|---------------|-------------------------------------------|
| GET    | /api/v1/users       | Admin only    | View all users                             |
| GET    | /api/v1/users/:userId | Admin only  | View a single user                         |
| PUT    | /api/v1/users/:userId | Admin/Own   | Update any user (Admin) or own profile    |
| DELETE | /api/v1/users/:userId | Admin only  | Delete a user (only if no active bookings)|

### **Vehicles**
| Method | Endpoint                  | Access     | Description                              |
|--------|---------------------------|-----------|------------------------------------------|
| GET    | /api/v1/vehicles          | Public    | View all vehicles                         |
| GET    | /api/v1/vehicles/:vehicleId | Public  | View specific vehicle                     |
| POST   | /api/v1/vehicles          | Admin     | Add a new vehicle                          |
| PUT    | /api/v1/vehicles/:vehicleId | Admin   | Update vehicle details                      |
| DELETE | /api/v1/vehicles/:vehicleId | Admin   | Delete a vehicle (if no active bookings) |

### **Bookings**
| Method | Endpoint                  | Access     | Description                              |
|--------|---------------------------|-----------|------------------------------------------|
| POST   | /api/v1/bookings          | Customer/Admin| Create booking, check availability, update vehicle status |
| GET    | /api/v1/bookings          | Role-based    | Admin: view all bookings; Customer: view own bookings |
| PUT    | /api/v1/bookings/:bookingId | Role-based  | Customer: cancel booking before start date; Admin: mark returned |

---

## Setup & Usage>>>


## ** Install dependencies

npm install


## Created .env file in project root with:

PORT=5000

CONNECTION_STR=postgresql://username:password@host:port/database
JWT_SECRET=jwt_secret

## Run the server with: 

npm run dev


## Access API

http://localhost:5000/api/v1/


## Notes
***All passwords are hashed using bcrypt before storing in the database.
***Bookings automatically update vehicle availability.
***Deletion of users/vehicles is restricted if there are active bookings.
***JWT must be sent in Authorization: Bearer <token> header for protected routes.



### Links:
    Github Repository link: https://github.com/Sadman-Sakib56/vehical_rental_backend
    Live Url link: https://vehical-rental-backend-six.vercel.app/




## Author

Sadman Sakib

Email: sadmansakib60356@gmail.com

Location: Dhaka, Bangladesh.





