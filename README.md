## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (for running the React frontend)
- [Ballerina](https://ballerina.io/downloads/) (for running the Ballerina backend)
- [MySQL](https://www.mysql.com/) (for the database)

### Backend Setup (Ballerina)

1. **Navigate to the backend directory**:
   ```bash
   cd iwb310-backlog-bashers
   ```

2. **Run the Ballerina backend**:
   ```bash
   bal.bat run \iwb310-backlog-bashers
   ```

   The backend should now be running on `http://localhost:8080`.

### Frontend Setup (React)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the React frontend**:
   ```bash
   npm run dev
   ```

   The frontend should now be running on `http://localhost:5173`.

## Available Scripts (Frontend)

In the `frontend` directory, you can run the following commands:

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production.

## Available Scripts (Backend)

In the `backend` directory, you can run:

- `ballerina run src`: Runs the Ballerina service.

## Login Credentials

After setting up the frontend and backend, you can log in using the following credentials:

-   **Username**: `newemail@example.com`
-   **Password**: `johndoe123`

Use these credentials to access the system.

## Technologies Used

### Backend

- **Ballerina**: An open-source programming language optimized for network services.
- **MySQL**: The relational database system for managing daycare data.

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime for executing frontend-related tasks.

## Repository Structure

- **BusyBees_DCMS**: Main repository with backend and frontend.
- **BusyBees_DCMS-Front_End-**: The original React frontend repository ([merged into this one](https://github.com/hewageuhcu/BusyBees_DCMS-Front_End-.git)).
- **BusyBees_DCMS-Backend**: The original Ballerina backend repository ([merged into this one](https://github.com/Dhammika-Mahendra/BusyBees_DCMS.git)).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.



