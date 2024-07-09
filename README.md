# Dev Solution Finder

## Project Overview

Dev Solution Finder is a comprehensive project that includes three main components: AI, Backend, and Frontend. Each component is structured to work independently but also integrates seamlessly with the others.

## Folder Structure

### AI

- **Dockerfile**: Docker configuration for the AI component.
- **docker-compose.prod.yml**: Production configuration for Docker Compose.
- **docker-compose.yml**: Development configuration for Docker Compose.
- **pyproject.toml**: Python project configuration.
- **requirements.txt**: Python dependencies.
- **app/**: Contains the source code for the AI component.
  - ****init**.py**: Package initialization.
  - **config.py**: Configuration settings.
  - **main.py**: Main application entry point.
  - **models.py**: Data models.
  - **routes.py**: API routes.
  - **services.py**: Business logic and services.

### Backend

- **.babelrc**: Babel configuration.
- **.eslintrc.json**: ESLint configuration.
- **Dockerfile**: Docker configuration for the Backend component.
- **docker-compose.prod.yml**: Production configuration for Docker Compose.
- **docker-compose.yml**: Development configuration for Docker Compose.
- **package.json**: Node.js project configuration.
- **tsconfig.json**: TypeScript configuration.
- **yarn.lock**: Yarn lock file.
- **src/**: Contains the source code for the Backend component.
  - **index.ts**: Entry point for the application.
  - **server.ts**: Server configuration.
  - **api/**: API definitions.
  - **config/**: Configuration settings.
  - **controllers/**: Controller logic.
  - **middlewares/**: Middleware functions.
  - **models/**: Data models.
  - **routes/**: API routes.
  - **services/**: Business logic and services.

### Frontend

- **.babelrc**: Babel configuration.
- **.eslintrc.json**: ESLint configuration.
- **Dockerfile**: Docker configuration for the Frontend component.
- **docker-compose.prod.yml**: Production configuration for Docker Compose.
- **docker-compose.yml**: Development configuration for Docker Compose.
- **next-env.d.ts**: Next.js environment types.
- **next.config.js**: Next.js configuration.
- **package.json**: Node.js project configuration.
- **tsconfig.json**: TypeScript configuration.
- **yarn.lock**: Yarn lock file.
- **src/**: Contains the source code for the Frontend component.
  - **pages/**: Next.js pages.
  - **app/**: Application-specific logic.
  - **components/**: React components.
  - **context/**: Context providers.
  - **hooks/**: Custom hooks.
  - **types/**: TypeScript types.
  - **utils/**: Utility functions.

## GitHub Actions

- **.github/workflows/**: Contains CI/CD workflows for building and deploying the project.
  - **build_ai_image.yaml**: Workflow for building the AI Docker image.
  - **deploy_ai.yaml**: Workflow for deploying the AI component.
  - **deploy_frontend.yaml**: Workflow for deploying the Frontend component.
  - **update-compose.yaml**: Workflow for updating Docker Compose configuration.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node.js
- Yarn

### Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd dev-solution-finder-main
   ```
