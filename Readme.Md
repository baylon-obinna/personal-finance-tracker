# Personal Finance Tracker

A full-stack web application for managing personal finances, built with React, Node.js, Express, and MongoDB.

**Technologies Used**

#### Frontend

- React

- Tailwind CSS (for styling)

#### Backend

- Node.js

- Express.js (web server framework)

- MongoDB (database)

- Mongoose (Object Document Mapping)
 
#### Database and Authentication

- MongoDB (NoSQL database)

- Mongoose (Object Document Mapping)

- Firebase Authentication

#### Project Structure

The project follows a typical full-stack structure:

```python
personal-finance-tracker/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── config
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
└── README.md
```

client/: 

- Contains the React.js frontend application.


server/:

- controllers/: Handles the business logic for each API endpoint.

- models/: Defines the Mongoose data models.

- routes/: Defines the API endpoints.

- config/: Holds configuration files (e.g., MongoDB connection, Firebase).

- server.js: Entry point of the Express.js server.

#### Installation

Clone the repository:

- git clone https://github.com/baylon-obinna/personal-finance-tracker.git

- Create a .env file in server directory
    MONGO_URI=mongodb://localhost:27017/personal_finance_db //modify the URL to your DB configuration
    PORT=5000 //server port
    JWT_SECRET= demo123 //demo secret
    FRONTEND_URL=http://localhost:3000 //frontend URL
    NODE_ENV=development

- Install and start the MongoDB
    Install, enable and run MongoDB on your local machine or use a cloud-hosted MongoDB service.
    Update the MongoDB connection details in the server/config/db.js file.

- Install dependencies for both the client and server:

- cd personal-finance-tracker

- cd server

- npm install

- node server.js

- cd ../client

- npm install 

- npm run start

The app will be available at http://localhost:3000.


![alt text](<Screenshot (224).png>) ![alt text](<Screenshot (225).png>)

#### Expected Features

Transaction Management:

Users can add, edit, and delete their transactions.
Transactions can be categorized for better financial tracking.
Users can view a list of all their transactions.


Reporting and Visualizations:

The dashboard provides an overview of the user's financial status, including total balance, monthly budget, and investments.
Users can generate reports and view data visualizations to understand their spending patterns and investment performance.


Secure Authentication:

The application integrates with Firebase Authentication, allowing users to sign up, log in, and manage their accounts securely.



#### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

For more insight https://medium.com/@nwaoshop/developing-the-personal-finance-tracker-bridging-the-gap-between-finance-and-software-engineering-2839083768e3