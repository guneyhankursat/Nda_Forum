# NDA Forum

NDA Forum is a full-stack application designed to analyze Non-Disclosure Agreements (NDAs) using AI. It provides a secure, user-friendly platform for users to upload NDA text and receive an analysis of key clauses. The application is built with a Vue 3 frontend, a NestJS backend, and uses PostgreSQL for data storage, all orchestrated with Docker.

## ✨ Features

- **User Authentication**: Secure user registration and login using JWT tokens.
- **AI-Powered NDA Analysis**: Analyzes NDA text to identify the presence and content of key clauses.
- **Protected Routes**: API routes are protected, requiring valid JWT authentication.
- **RESTful API**: A well-structured backend API for managing users and NDA analysis.
- **Dockerized Environment**: Fully containerized for easy setup and deployment.
- **Reverse Proxy**: Nginx is configured as a reverse proxy for the frontend and backend services.

## 🚀 Tech Stack

- **Frontend**: Vue 3, Vite, JavaScript
- **Backend**: NestJS, TypeScript, TypeORM
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: OpenAI API
- **Containerization**: Docker, Docker Compose
- **Reverse Proxy**: Nginx

## 🏁 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.
- An [OpenAI API Key](https://platform.openai.com/api-keys) for AI analysis.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/guneyhankursat/Nda_Forum.git
    cd Nda_Forum
    ```

2.  **Set up environment variables:**
    The backend service requires an OpenAI API key to function correctly. You need to pass this key to the `docker-compose.yml` file.

    In your `docker-compose.yml`, find the `backend` service and update the `OPENAI_API_KEY` environment variable:
    ```yaml
    services:
      backend:
        # ... other configurations
        environment:
          # ... other environment variables
          OPENAI_API_KEY: "your-actual-openai-api-key-here" 
    ```
    *Note: For a production environment, it is recommended to use a `.env` file and reference it in your `docker-compose.yml` to avoid hardcoding secrets.*

3.  **Build and run the application with Docker Compose:**
    ```sh
    docker-compose up --build -d
    ```
    This command will build the images for the frontend and backend services and start all the containers in detached mode.

## Usage

Once the containers are up and running:

-   **Frontend**: Access the application at `http://localhost`.
-   **Backend API**: The API is available at `http://localhost:3000`.
-   **Database**: The PostgreSQL database is running on port `5432`.

You can register a new user, log in, and use the NDA checker to analyze your documents.

## 🐳 Docker Services

The `docker-compose.yml` file defines the following services:

-   `frontend`: The Vue 3 application.
-   `backend`: The NestJS API.
-   `db`: The PostgreSQL database.
-   `nginx`: The reverse proxy that routes traffic to the frontend and backend.
