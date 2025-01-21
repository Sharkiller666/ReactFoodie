# ReactFoodie
# Restaurant Board Application

## Overview
The **Restaurant Board Application** allows users to:

1. Register an account.
2. Log in with their credentials.
3. Post ratings for restaurants, including a brief review.

The application is built with a backend using **Node.js**, **Express**, and a **MySQL** database. The front-end is developed using **React**, providing an intuitive and user-friendly interface.

---

## Features

### User Authentication
- **Register**: New users can create an account by providing a username and password.
- **Login**: Registered users can log in to access the app's features.

### Restaurant Rating
- **Post a Rating**: Users can rate restaurants on a scale of 1-5 stars and optionally leave a review.
- **View Ratings**: All ratings for a restaurant are displayed, showing user reviews and average ratings.

---

---

## Preview

![Alt Text](./foodie.png)
---
## Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- MySQL
- npm or yarn

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd restaurant-board
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database named `restaurant_board`.
   - Run the following SQL script to create the necessary tables:
     ```sql
     CREATE DATABASE restaurant_board;
     
     USE restaurant_board;

     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         password VARCHAR(255) NOT NULL
     );

     CREATE TABLE products (
         id INT AUTO_INCREMENT PRIMARY KEY,
         user_id INT NOT NULL,
         restaurant_name VARCHAR(255) NOT NULL,
         rating INT NOT NULL,
         review TEXT,
         FOREIGN KEY (user_id) REFERENCES users(id)
     );
     ```

4. Configure the database connection:
   - Create a `.env` file in the root directory:
     ```
     DB_HOST=localhost
     DB_USER=<your-database-username>
     DB_PASSWORD=<your-database-password>
     DB_NAME=restaurant_board
     ```

5. Start the server:
   ```bash
   npm start
   ```

### Front-End Setup
1. Navigate to the front-end directory (if separate):
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the application in your browser at `http://localhost:3000`.

---

## API Endpoints

### User Authentication
- **Register**:
  - **Method**: POST
  - **Endpoint**: `/register`
  - **Body**:
    ```json
    {
      "name": "exampleuser",
      "password": "examplepassword"
    }
    ```

- **Login**:
  - **Method**: POST
  - **Endpoint**: `/login`
  - **Body**:
    ```json
    {
      "name": "exampleuser",
      "password": "examplepassword"
    }
    ```

### Post Rating
- **Method**: POST
- **Endpoint**: `/products`
- **Body**:
  ```json
  {
    "restaurant_name": "Restaurant ABC",
    "rating": 5,
    "review": "Excellent food and service!"
  }
  ```

### Get Ratings for a Restaurant
- **Method**: GET
- **Endpoint**: `/ratings?restaurant_name=<name>`

---

## Project Structure
```
restaurant-board/
├── server/             # Backend application
│   ├── app.js          # Main application file
│   ├── routes/         # API routes
│   └── models/         # Database models
├── client/             # Frontend application
│   ├── src/
│   │   ├── pages/      # Page components
│   │   └── App.js      # Main React application file
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
└── README.md           # Documentation
```

---
