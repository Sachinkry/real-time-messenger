# Real-Time Messaging Application

## Overview

This project is a real-time messaging application built using Next.js, TypeScript, and NextAuth for authentication. It allows users to send and receive messages in real-time, leveraging modern web technologies to provide a seamless user experience.

## Features

- **User Authentication**: Secure user authentication using NextAuth with multiple providers (GitHub, Google, and custom credentials).
- **Real-Time Messaging**: Users can send and receive messages instantly.
- **Database Integration**: Utilizes Prisma as an ORM to interact with the database.
- **Responsive Design**: The application is designed to be responsive and user-friendly across devices.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **TypeScript**: A superset of JavaScript that adds static types.
- **NextAuth**: Authentication for Next.js applications.
- **Prisma**: A modern database toolkit for TypeScript and Node.js.
- **Bcrypt**: A library to hash passwords securely.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sachinkry/real-time-messenger.git
   cd real-time-messenger
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   DATABASE_URL=your_database_url
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.
