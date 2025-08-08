# ClearCart

This is a full-stack application for a marketplace where users can buy, sell, and rent products.

## Getting Started

### Prerequisites

- Java 17 or higher
- Gradle
- Node.js (v18 or higher recommended)
- pnpm
- PostgreSQL

### Backend Setup (Server)

1.  **Database Setup**:
    - Make sure you have PostgreSQL running.
    - Create a database named `clearcart`.
    - The default credentials are `postgres` for the username and `mysecretpassword` for the password. You can change these in `Server/src/main/resources/application-dev.yml`.

2.  **Run the application**:
    - Navigate to the `Server` directory:
      ```bash
      cd Server
      ```
    - Run the application using the Gradle wrapper:
      ```bash
      ./gradlew bootRun
      ```
    - The server will start on port `8080`.

### Frontend Setup (Client)

1.  **Install Dependencies**:
    - Navigate to the `client` directory:
      ```bash
      cd client
      ```
    - Install the dependencies using `pnpm`:
      ```bash
      pnpm install
      ```

2.  **Run the application**:
    - Start the development server:
      ```bash
      pnpm run dev
      ```
    - The frontend will be available at `http://localhost:5173`.

## Running with Docker Compose

This is the recommended way to run the application for development. It will start the backend server, the frontend client, and a PostgreSQL database.

**Prerequisites:**
- Docker
- Docker Compose

**Instructions:**

1.  Make sure you have Docker and Docker Compose installed on your system.
2.  From the root directory of the project, run the following command:
    ```bash
    docker-compose up --build
    ```
3.  The services will be available at the following URLs:
    - Frontend: `http://localhost:5173`
    - Backend: `http://localhost:8080`