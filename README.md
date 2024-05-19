# Chat Web App

This repository contains the source code for a simple chat web application. It consists of both frontend and backend components.

## Technologies Used

### Frontend
- React.js with Vite
- Socket.io-client

### Backend
- Node.js
- Express
- MongoDB
- Socket.io

## Installation and Setup

### Prerequisites
- Node.js installed on your machine
- MongoDB installed and running locally

### Cloning the Repository
``` git clone https://github.com/arifpirxada/ChatRoom-MERN ```

### Running the Backend Server
1. Navigate to the `chat-server` directory:
``` cd chat-server ```

2. Install dependencies:
``` npm install ```

3. Create a `.env` file with the following variables:   
``` MONGODB_URL=mongodb://127.0.0.1:27017/chat-room JWT_SECRET_KEY=04f81abcd22b72985bb96ecdf15a8b411b2cdc8583fd382bc01e5bec983265ee ```

4. Run the server:
``` npm run dev ```

You can now go to "http://localhost:3000" and access the web app


### Running the Frontend Client
1. Navigate to the `chat-client` directory:
``` cd chat-client ```

2. Install dependencies:
``` npm install ```

3. Run the client:
``` npm run dev ```

Now, you can also access the web app from "http://localhost:5173"

### Deployment

## Test Credentials
For the deployed chat web app, you can use the following test credentials:  
1. Email: first-demo@gmail.com, Password: first  
2. Email: second-demo@gmail.com, Password: second  
3. Email: third-demo@gmail.com, Password: third  


Deployed link:    
https://chatroom-mern-production.up.railway.app/