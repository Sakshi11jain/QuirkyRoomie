# QuirkyRoomie

## Project Overview
QuirkyRoomie is a Flatmate Conflict Management System that helps flatmates file and manage complaints, track issues, and view leaderboards based on participation.

## Features
- **User Authentication**: Signup/Login functionality.
- **File Complaints**: Users can submit complaints.
- **View Complaints**: Users can check previous complaints, mark them resolved, can upvote or downvote and see the punishment if upvote is 10+.
- **Leaderboard**: A ranking system for engagement.
- **Logout**: Secure logout functionality.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Setup Instructions
### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/QuirkyRoomie.git
cd QuirkyRoomie
```

### 2. Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd frontend
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the backend directory with the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the Application
#### Start Backend Server
```sh
cd backend
npm start
```
#### Start Frontend Server
```sh
cd frontend
npm start
```

### 5. Access the App
Open your browser and go to:
```
http://localhost:3000
```

## Contributing
Feel free to fork the repo, submit pull requests, and report issues.

## License
This project is licensed under the MIT License.

